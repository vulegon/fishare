module TestData
  class FishLoader
    FISHES = [
      "カサゴ",         # 海
      "アジ",           # 海
      "サバ",           # 海
      "イワシ",         # 海
      "メバル",         # 海
      "クロダイ",       # 海
      "ヒラメ",         # 海
      "マグロ",         # 海
      "サーモン",       # 川・海
      "ヤマメ",         # 川
      "イワナ",         # 川
      "アユ",           # 川
      "ウグイ",         # 川
      "コイ",           # 川
      "ブラックバス",   # 川
      "ブルーギル",     # 川
      "フナ",           # 川
      "スズキ",         # 海
      "カンパチ",       # 海
      "マダイ",         # 海
      "ブリ",           # 海
      "カツオ",         # 海
      "タチウオ",       # 海
      "マゴチ",         # 海
      "タナゴ",         # 川
      "ニジマス",       # 川
      "ハゼ",           # 川・海
      "アイナメ",       # 海
      "シーバス",       # 海
      "サヨリ",         # 海
      "キス",           # 海
      "メジナ",         # 海
      "カワハギ",       # 海
      "ホッケ",         # 海
      "アオリイカ",     # 海
      "タコ",           # 海
      "マアジ",         # 海
      "ギンポ",         # 海
      "ウツボ",         # 海
      "オヤニラミ",     # 川
      "ニゴイ",         # 川
      "コチ",           # 海
      "ドジョウ",       # 川
      "ナマズ",         # 川
      "ギンブナ",       # 川
      "マブナ",         # 川
      "オイカワ",       # 川
      "カマス",         # 海
      "ウミタナゴ",     # 海
      "チヌ",           # 海
      "ボラ",           # 海・川
      "マツカワ",       # 海
      "ホウボウ",       # 海
      "カワムツ",       # 川
      "ウミケムシ",     # 海
      "クロソイ",       # 海
      "トビウオ",       # 海
      "カジカ",         # 川
      "ワカサギ",       # 川
      "ホシガレイ",     # 海
      "カレイ",         # 海
      "ソウギョ",       # 川
      "アブラハヤ",     # 川
    ].freeze

    class << self
      def load
        FISHES.each.with_index(0) do |fish_name, index|
          fish = Fish.find_or_initialize_by(
            name: fish_name
          )
          fish.display_order = index

          fish.save! if fish.changed?
        end
      end
    end
  end
end
