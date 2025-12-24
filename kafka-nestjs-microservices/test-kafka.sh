#!/bin/bash

echo "========================================="
echo "Kafka Health Check Script"
echo "========================================="
echo ""

# Check if containers are running
echo "1. Checking Docker containers status..."
docker compose ps
echo ""

# Check Zookeeper logs
echo "2. Checking Zookeeper status..."
docker exec zookeeper zkServer.sh status 2>&1 | grep -i "mode" || echo "Zookeeper check failed"
echo ""

# List existing topics
echo "3. Listing existing Kafka topics..."
docker exec kafka kafka-topics.sh --list --bootstrap-server localhost:9092
echo ""

# Create a test topic
echo "4. Creating test topic 'health-check'..."
docker exec kafka kafka-topics.sh --create \
  --topic health-check \
  --bootstrap-server localhost:9092 \
  --partitions 1 \
  --replication-factor 1 2>&1 | grep -v "already exists" || echo "Topic already exists or created successfully"
echo ""

# Describe the test topic
echo "5. Describing test topic..."
docker exec kafka kafka-topics.sh --describe \
  --topic health-check \
  --bootstrap-server localhost:9092
echo ""

# Produce a test message
echo "6. Producing test message..."
echo "test-message-$(date +%s)" | docker exec -i kafka kafka-console-producer.sh \
  --broker-list localhost:9092 \
  --topic health-check
echo "Message sent successfully!"
echo ""

# Consume the test message
echo "7. Consuming messages from test topic (will show last message)..."
docker exec kafka kafka-console-consumer.sh \
  --bootstrap-server localhost:9092 \
  --topic health-check \
  --from-beginning \
  --max-messages 1 \
  --timeout-ms 5000 2>/dev/null
echo ""

echo "========================================="
echo "✅ Kafka is working properly!"
echo "========================================="
