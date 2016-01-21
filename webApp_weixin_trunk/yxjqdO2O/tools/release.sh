#!/bin/bash
rm -fr www
cp -r ../www www
temp_path=www

for item in `find ${temp_path} -name "*.js"`;do
    echo uglifyjs $item -o $item -c drop_console=true -m -r "$,require,exports,module"
    node_modules/uglifyjs/bin/uglifyjs $item -o $item -c  drop_console=true -m -r "$,require,exports,module"
done

for item in `find ${temp_path} -name "*.css"`;do
    echo cleancss $item -o $item -s0 --skip-aggressive-merging --skip-rebase
    node_modules/clean-css/bin/cleancss $item -o $item -s0 --skip-aggressive-merging --skip-rebase
done

for item in `find ${temp_path} -name "*.html"`;do
    echo html-minifier $item -c html-minifier.json -o $item
    node node_modules/html-minifier/cli.js $item -c html-minifier.json -o $item
done





