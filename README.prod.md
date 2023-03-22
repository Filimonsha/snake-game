## Docker compose

Получение сертификатов взято отсюда

https://github.com/coreycothrum/nginx_certbot_docker_compose

### Последовательность запуска

```bash
docker-compose -f docker-compose.prod.yml down
```

```bash
docker-compose -f docker-compose.prod.yml build
```

```bash 
docker-compose -f docker-compose.prod.yml run --rm --entrypoint generate_self_signed_certs.sh certbot
```

```bash 
docker-compose -f docker-compose.prod.yml up -d
```

```bash 
docker-compose -f docker-compose.prod.yml exec certbot request_certs.sh
```

```bash 
docker-compose -f docker-compose.prod.yml logs -f
```

```bash 
docker-compose -f docker-compose.prod.yml exec nginx nginx -s reload
```

