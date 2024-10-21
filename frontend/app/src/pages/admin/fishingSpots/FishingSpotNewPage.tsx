import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Stack,
  Button,
  Grid,
  IconButton
} from '@mui/material';
import { MainLayout } from 'features/layouts';
import Container from '@mui/material/Container';
import { useSearchParams } from 'react-router-dom';
import {
  FishingSpotNewLoadMap,
  Label
} from 'features/admin/fishingSpots/map/new/';
import { fetchAddress } from 'api/lib/libGoogle/geocodeClient';
import { Prefecture } from 'interfaces/api';
import apiClient from 'api/v1/apiClient';
import RoomIcon from '@mui/icons-material/Room';
import InfoIcon from '@mui/icons-material/Info';
import MapIcon from '@mui/icons-material/Map';
import { faFish } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CancelIcon from '@mui/icons-material/Cancel';

export const FishingSpotNewPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const lat = parseFloat(searchParams.get('lat') || '35.681236');
  const lng = parseFloat(searchParams.get('lng') || '139.767125');
  const [marker, setMarker] = useState<google.maps.LatLngLiteral>({ lat, lng});
  const [address, setAddress] = useState<string>('');
  const [prefecture, setPrefecture] = useState<Prefecture>();
  const [images, setImages] = useState<File[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoaded(false);
      const addressResponse = await fetchAddress(marker.lat, marker.lng);
      const prefectureData = await apiClient.getPrefectures();
      const findPrefecture = prefectureData.prefectures.find((pref: Prefecture)=> pref.name === addressResponse.prefecture);

      setAddress(addressResponse.address);
      setPrefecture(findPrefecture);
    };

    const loadData = async () => {
      await fetchData(); // fetchDataの完了を待つ
      setIsLoaded(true); // 完了後にLoadingをtrueにする
    };
  
    loadData();
  }, [marker]);

  const onMapClick = (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;
    setMarker({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  }

  // 画像の追加処理
  const handleOnAddFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files: File[] = [];
    const remainingSlots = 9 - images.length;

    for (let i = 0; i < Math.min(e.target.files.length, remainingSlots); i++) {
      files.push(e.target.files[i]);
    }

    setImages([...images, ...files]);
    e.target.value = '';
  };

  // 画像の削除処理
  const handleOnDeleteFile = (index: number) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  return (
    <MainLayout>
      <Container
        fixed
      >
        <Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              textAlign: 'center',
              mt: 4,
              mb: 3,
            }}
          >
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
              釣り場登録
            </Typography>
          </Box>

          <Stack spacing={5}>
            <Box>
              <Label label={'釣り場の場所'} icon={<MapIcon/>}/>
              <Box
                sx={{
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: 3,
                  width: '100%',
                  height: '400px',
                  minWidth: '500px',
                }}
              >
                {marker && isLoaded && (
                  <FishingSpotNewLoadMap
                  marker={marker}
                  onMapClick={onMapClick}
                />
                )}
              </Box>
            </Box>

            <Stack spacing={3}>
              <Box>
                <Label label={'釣り場の名前'} icon={<MyLocationIcon/>}/>
                <TextField label="名称を入力" variant="outlined" fullWidth />
              </Box>

              {/** 住所入力 **/}
              <Box>
                <Label label={'住所'} icon={<RoomIcon/>}/>
                <TextField
                  label="住所を入力"
                  variant="outlined"
                  fullWidth
                  value={address}
                />
              </Box>

              <Box>
                <Label label={'添付ファイル'} icon={<AttachFileIcon/>}/>
                <label htmlFor="file-upload">
                  <input
                    id="file-upload"
                    type="file"
                    style={{ display: 'none' }}
                    accept="image/*,.png,.jpg,.jpeg,.gif"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => { handleOnAddFile(e) }}
                    multiple
                  />
                  <Button variant="contained" component="span">
                    ファイルを選択
                  </Button>
                </label>

                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 8, sm: 12, md: 12 }} sx={{margin: 3}}>
                  {images.map((image, index) => (
                    <Grid
                      item
                      xs={4}
                      sm={4}
                      md={4}
                      key={index}
                      sx={{
                        display: 'flex',
                        justifyContent: 'start',
                        alignItems: 'center',
                        position: 'relative',
                        margin: 0
                      }}
                    >
                        <IconButton
                          area-label="画像削除"
                          style={{ position: 'absolute', top: 10, right: 0, color: '#aaa' }}
                          onClick={() => { handleOnDeleteFile(index) }}
                        >
                          <CancelIcon/>
                        </IconButton>
                      <img
                        src={URL.createObjectURL(image)}
                        alt="アップロード済み画像"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          aspectRatio: '1/1',
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>

              <Box>
                <Label
                  label={'釣れる魚'}
                  icon={<FontAwesomeIcon icon={faFish} style={{ fontSize: '23px' }}/>}
                />
                <TextField
                  label="釣れる魚を入力"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={3}
                />
              </Box>

              <Box>
                <Label label={'説明'} icon={<InfoIcon/>}/>
                <TextField
                  label="備考を入力"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={3}
                />
              </Box>
            </Stack>

            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Button variant="contained" color="primary" size="large">
                釣り場を登録する
              </Button>
            </Box>
          </Stack>
        </Box>
      </Container>
    </MainLayout>
  );
};
