module Api
  module V1
    module S3
      class ImageSerializer
        def initialize(parameter, prefix)
          @image_forms = parameter.image_forms
          @prefix = prefix
        end

        def as_json
          {
            images: @image_forms.map { |image_form| PresignedUrlSerializer.new(image_form, @prefix).as_json }
          }
        end
      end
    end
  end
end
