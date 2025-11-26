#!/usr/bin/env bash
set -e

BROKER="${BROKER:-localhost:9092}"

TOPICS=(
  "auth.sign_up"
  "auth.sign_in"
  "user.create"
  "user.get_by_id"
  "subjects.get_all_subjects"
  "subjects.create_subject"
  "topics.create_topic"
  "learning_content.get_learning_contents"
  "learning_content.get_upload_content_url"
  "learning_content.post_content"
)

echo "Waiting for Kafka broker at $BROKER..."

# until nc -z "$(echo $BROKER | cut -d: -f1)" "$(echo $BROKER | cut -d: -f2)"; do
#   echo "Kafka is unavailable - sleeping"
#   sleep 2
# done

echo "Kafka is up. Creating topics..."

for topic in "${TOPICS[@]}"; do
  echo "Creating topic: $topic"
  kafka-topics.sh \
    --bootstrap-server "$BROKER" \
    --create \
    --if-not-exists \
    --partitions 1 \
    --replication-factor 1 \
    --topic "$topic"
done

echo "All topics created (or already existed)."
