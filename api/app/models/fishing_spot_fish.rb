# == Schema Information
#
# Table name: fishing_spot_fishes
#
#  id                        :uuid             not null, primary key
#  created_at                :datetime         not null
#  updated_at                :datetime         not null
#  fish_id(魚マスタID)       :uuid             not null
#  fishing_spot_id(釣り場ID) :uuid             not null
#
# Indexes
#
#  index_fishing_spot_fishes_on_fish_id                             (fish_id)
#  index_fishing_spot_fishes_on_fishing_spot_id                     (fishing_spot_id)
#  index_fishing_spot_fishes_on_fishing_spot_id_and_fish_id_unique  (fishing_spot_id,fish_id) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (fish_id => fish.id)
#  fk_rails_...  (fishing_spot_id => fishing_spots.id)
#

# 釣り場と魚の関連を管理する交差モデル
class FishingSpotFish < ApplicationRecord
  audited
  belongs_to :fishing_spot
  belongs_to :fish

  validates :fishing_spot_id, presence: true, uniqueness: { scope: :fish_id }
  validates :fish_id, presence: true
end
