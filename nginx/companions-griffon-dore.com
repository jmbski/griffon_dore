server {
    listen 443 ssl;
    listen [::]:443 ssl;
    
    ssl_certificate /etc/letsencrypt/live/companions-griffon-dore.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/companions-griffon-dore.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

    #root /var/www/companions-griffon-dore.com/html;
    root /usr/share/nginx/html
        index index.html index.htm index.nginx-debian.html;

    server_name companions-griffon-dore.com www.companions-griffon-dore.com;

    #location /services/ {
    #    include proxy_params;
    #    proxy_pass http://unix:/griffon_dore_app/gd_app/griffon_dore_app.sock;
    #}2
    location / {
        # First attempt to serve request as file, then
        # as directory, then redirect to index(angular) if no file found.
        proxy_pass http://localhost:80;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

server {
    if ($host = www.companions-griffon-dore.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    if ($host = companions-griffon-dore.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    listen 80;

    server_name companions-griffon-dore.com www.companions-griffon-dore.com;
}
##############
#
server {
    listen 80;
    server_name companions-griffon-dore.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name companions-griffon-dore.com;

    ssl_certificate /etc/letsencrypt/live/companions-griffon-dore.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/companions-griffon-dore.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    root /usr/share/nginx/html;
        index index.html index.htm index.nginx-debian.html;

    location / {
        proxy_pass http://localhost:4000; # Change this to the port your app runs on
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}