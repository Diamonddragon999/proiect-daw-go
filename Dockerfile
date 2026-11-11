FROM node:22-alpine AS web
WORKDIR /web
COPY web/package.json web/package-lock.json ./
RUN npm ci
COPY web/ ./
RUN npm run build

FROM golang:1.27-alpine AS build
WORKDIR /src
COPY go.mod go.sum ./
RUN go mod download
COPY main.go ./
RUN CGO_ENABLED=0 go build -o /app .

FROM alpine:3.22
WORKDIR /srv
COPY --from=build /app /srv/app
COPY --from=web /web/dist /srv/web/dist
ENV GIN_MODE=release DATA_DIR=/data PORT=8080
EXPOSE 8080
CMD ["/srv/app"]
