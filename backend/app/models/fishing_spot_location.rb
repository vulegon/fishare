# == Schema Information
#
# Table name: fishing_spot_locations
#
#  id                        :uuid             not null, primary key
#  address(住所)             :string           not null
#  latitude(緯度)            :decimal(10, 8)   not null
#  longitude(経度)           :decimal(11, 8)   not null
#  created_at                :datetime         not null
#  updated_at                :datetime         not null
#  fishing_spot_id(釣り場ID) :uuid             not null
#  prefecture_id(都道府県ID) :uuid             not null
#
# Indexes
#
#  index_fishing_spot_locations_on_fishing_spot_id  (fishing_spot_id)
#  index_fishing_spot_locations_on_prefecture_id    (prefecture_id)
#
# Foreign Keys
#
#  fk_rails_...  (fishing_spot_id => fishing_spots.id)
#  fk_rails_...  (prefecture_id => prefectures.id)
#
# 釣り場の位置情報テーブル。長い河川だと複数の位置を取り得る可能性があるため、1対多の関係
class FishingSpotLocation < ApplicationRecord
  belongs_to :fishing_spot
  belongs_to :prefecture
end
