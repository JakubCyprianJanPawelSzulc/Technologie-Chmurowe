volumes=$(docker volume ls --quiet)

for volume in $volumes
do
  used=$(docker run --rm -v $volume:/data alpine sh -c "df -h /data | awk 'NR==2{print \$5}'")
  echo "Volume $volume: uses $used"
done