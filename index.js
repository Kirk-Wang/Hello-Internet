const fs = require('fs');
const server = {
    "inbounds": [
        {
            "port": Number(process.env.V2RAY_SERVER_PORT),
            "protocol": "vmess",
            "settings": {
                "clients": [
                    {
                        "id": process.env.V2RAY_ID,
                        "alterId": 4,
                        "level": 1
                    }
                ]
            },
            "streamSettings": {
                "network": "ws",
                "wsSettings": {
                    "path": process.env.V2RAY_WS_PATH
                }
            }
        }
    ],
    "outbounds": [
        {
            "protocol": "freedom",
            "settings": {}
        },
        {
            "protocol": "blackhole",
            "settings": {},
            "tag": "blocked"
        }
    ],
    "routing": {
        "rules": [
            {
                "type": "field",
                "ip": [
                    "geoip:private"
                ],
                "outboundTag": "blocked"
            }
        ]
    }
};
const client = {
    "inbounds": [
        {
            "port": Number(process.env.V2RAY_CLIENT_PORT),
            "listen": "0.0.0.0",
            "protocol": "http",
            "sniffing": {
                "enabled": true,
                "destOverride": ["http", "tls"]
            },
            "settings": {}
        }
    ],
    "outbounds": [
        {
            "protocol": "vmess",
            "settings": {
                "vnext": [
                    {
                        "address": process.env.V2RAY_DOMAIN,
                        "port": 443,
                        "users": [
                            {
                                "id": process.env.V2RAY_ID,
                                "alterId": 4,
                                "level": 1,
                                "security": "auto"
                            }
                        ]
                    }
                ]
            },
            "streamSettings": {
                "network": "ws",
                "security": "tls",
                "wsSettings": {
                    "path": process.env.V2RAY_WS_PATH
                }
            }
        },
        {
            "protocol": "freedom",
            "setting": {},
            "tag": "free"
        }
    ],
    "routing": {
        "domainStrategy": "IPOnDemand",
        "rules": [
            {
                "type": "field",
                "ip": [
                    "geoip:cn", "geoip:private"
                ],
                "outboundTag": "free"
            }
        ]
    }
};
const nginxConf=`

server {
    listen 80 default_server;
    listen [::]:80 default_server;

    root /var/www/html;

    index index.html index.htm index.nginx-debian.html;

    server_name _;

    location / {
        try_files $uri $uri/ =404;
    }
}

server {
  listen  443 ssl;
  ssl on;
  ssl_certificate       /etc/v2ray/v2ray.crt;
  ssl_certificate_key   /etc/v2ray/v2ray.key;
  ssl_protocols         TLSv1 TLSv1.1 TLSv1.2;
  ssl_ciphers           HIGH:!aNULL:!MD5;
  server_name           ${process.env.V2RAY_DOMAIN};
        location = ${process.env.V2RAY_WS_PATH} {
        proxy_redirect off;
        proxy_pass http://v2:${process.env.V2RAY_SERVER_PORT};
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $http_host;
        }
    location / {
        proxy_pass https://www.viewster.com;
        proxy_set_header  X-Real-IP  $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
`
fs.writeFileSync("/app/test/config.json",JSON.stringify(server,null,4))
fs.writeFileSync("/app/test/default.conf", nginxConf);
fs.writeFileSync('/app/test/client.json', JSON.stringify(client, null, 4));
console.log('write success!');


