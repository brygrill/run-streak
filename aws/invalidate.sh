export $(egrep -v '^#' .env | xargs)

aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_ID --paths /*