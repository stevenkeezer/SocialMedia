<h1 align="center">
  <br>
  <img src="https://media.istockphoto.com/vectors/gardening-tools-and-plants-in-the-garden-vector-id1268196717?k=20&m=1268196717&s=612x612&w=0&h=RBA2SisPRx6OIeouAQ2R7I78eiazDS2gvGPr17mHvy4=" alt="Markdownify" width="200">
  <br>
  GrowLab
  <br>
</h1>

<h4 align="center">A growing companion app built on top of NextJs and .Net Core 6.</h4>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> 
</p>

<p align="center" href="https://ibb.co/nwQSFLK"><img src="https://i.ibb.co/D1wnZRj/Screen-Shot-2022-09-07-at-1-00-34-AM.png" alt="Screen-Shot-2022-09-07-at-1-00-34-AM" border="0"></p>

## Key Features

- Add events and show off your grows
- Dark/Light mode
- Photo upload widget with a Dropzone and a Cropper to resize images
- Following feature
- Drafts events
- Calendar and category filtering
- Event search
- SignalR to enable real time web communication

## How To Use

Clone and run this application, you'll need a [cloudinary](https://cloudinary.com/) account and to generate an api key.

```bash
# Clone this repository
$ git clone https://github.com/stevenkeezer/velypt.git

# Go into the server repository
$ cd API

# Add appsettings.json file to API folder with the following format
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "Cloudinary": {
    "CloudName": "YOUR_CLOUD_NAME",
    "ApiKey": "YOUR_API_KEY",
    "ApiSecret": "YOUR_API_SECRET"
  }
}

# Run the server
$ dotnet watch run

# Go into the repository client-app folder and install dependencies
$ cd client-app

# Install dependencies
$ npm install

# Run the app
$ npm run dev
```

> **Note**
> This project uses React 16. If you are using a newer version of React, you may need to have some dependency issues.
> If you would like to skip the registration process, you can use the following credentials to login:
> Email: tom@test.com
> Password: Pa$$w0rd
