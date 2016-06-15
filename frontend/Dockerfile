FROM nginx:latest

# Copy output of grunt build to /usr/share/nginx/html/
COPY ./dist/ /usr/share/nginx/html/

# Overwrite nginx.conf in the image, to set the DNS resolver
ADD ./conf/nginx.conf /etc/nginx/nginx.conf

# Open port and start nginx
EXPOSE 80
CMD ["/usr/sbin/nginx", "-g", "daemon off;"]