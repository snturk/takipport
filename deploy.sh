set -e

firebase deploy
npm run build
npm run generate

cd dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:snturk/attd.git master:gh-pages

cd -