require 'compass/import-once/activate'

http_path = "/"
css_dir = "css"
sass_dir = "sass"
images_dir = "img"
generated_images_path = "img/generated"
javascripts_dir = "js"
fonts_dir = "fonts"

require 'compass-normalize'
require 'rgbapng'
require 'toolkit'
require 'breakpoint'
require 'singularitygs'
require 'susy'
require 'sass-globbing'

output_style = :compressed
relative_assets = true
line_comments = false
sass_options = {:debug_info => false}
sass_options = {:sourcemap => false}
