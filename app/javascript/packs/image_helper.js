export default function imageHelper(name, type = 'png') {
  return `https://s3.us-east-2.amazonaws.com/toshi-vision-assets/${name}.${type}`;
}
