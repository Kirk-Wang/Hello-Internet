# HELLO-INTERNET

[v2ray](https://v2ray.com/)

Docker 一键部署 v2ray（简单版😂）

### VPS

*  49.99刀每年的洛杉矶CN2 vps，套餐包含1核cpu 1G内存，20GB硬盘，每月1T流量，电信走CN2、中国联通直连国内，1Gbps大水管带宽。 [直达链接->](https://bwh88.net/aff.php?aff=58022&pid=57)
*  119.99刀每年/65.99半年的洛杉矶CN2 GIA-E vps，套餐包含1核cpu 1G内存，20GB硬盘，每月1T流量，2.5G企业级宽带直连中国电信、联通以及其他网络。[直达链接->](https://bwh88.net/aff.php?aff=58022&pid=87)
* 899.99刀每年/89.99每月/249.99每季/479.99半年的香港pccw线路vps，土豪专用套餐，包含2个cpu 2G内存，40GB硬盘，每月500G流量，1G带宽直连中国电信和联通。 [直达链接->](https://bwh88.net/aff.php?aff=58022&pid=95)

### docker & docker-compose(VPS)
```sh
# docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
docker info # 看一下启起来来没
# service docker start
# docker-compose
curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```

### 修改 Dockerfile.tls
```
ENV V2RAY_DOMAIN example.com
```
example.com 改成你自己的

### Up(域名解析到 VPS 后😂)
```sh
docker-compose -f docker-compose.tls up
### 看到 `TLS Done! ` 后，Ctrl+C 退出
docker-compose up -d
### Hello, Internet~
```

### 客户端配置
```sh
cat /root/config/client.json
```

### 神一样的工具们
[V2RayU](https://github.com/yanue/V2rayU/releases), Mac
[v2rayN](https://github.com/2dust/v2rayN/releases), Windows
[v2ray-config-gen](https://intmainreturn0.com/v2ray-config-gen/), 
  * 生成自己的 v2ray ID，用默认的也没啥问题~

### 相关参考网站及项目(Thanks~)
[网络跳跃](https://www.hijk.pw/category/v2ray/)
[v2ray-websocket-nginx-cloudflare-CDN](https://github.com/jueinin/v2ray-websocket-nginx-cloudflare-CDN)

### 进一步完善(coming soon...)