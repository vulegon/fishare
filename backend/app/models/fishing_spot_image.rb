# == Schema Information
#
# Table name: fishing_spot_images
#
#  id                             :uuid             not null, primary key
#  content_type(ファイルの拡張子) :string           not null
#  file_name(ファイル名)          :string           not null
#  file_size(ファイルサイズ)      :integer          not null
#  s3_key(S3キー)                 :string           not null
#  s3_url(S3のURL)                :string           not null
#  created_at                     :datetime         not null
#  updated_at                     :datetime         not null
#  fishing_spot_id(釣り場ID)      :uuid             not null
#
# Indexes
#
#  index_fishing_spot_images_on_fishing_spot_id  (fishing_spot_id)
#
# Foreign Keys
#
#  fk_rails_...  (fishing_spot_id => fishing_spots.id)
#
# 釣り場の画像を管理するモデル
class FishingSpotImage < ApplicationRecord
  belongs_to :fishing_spot
end
