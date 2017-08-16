# ReactND.P2.Readable
This the _Readable_ project for Udacity's React Fundamentals course.

Mark Anderson // July 2017 cohort

## Installation of App (standard)

At the command line enter:
```
export CMD=''

$CMD git clone https://github.com/Mark70117/ReactND.P2.Readable.git
$CMD cd ReactND.P2.Readable/
$CMD npm install
$CMD cd ..
```

## Required Server (standard)
This should be installed in a different directory than the App
```

$CMD git clone https://github.com/udacity/reactnd-project-readable-starter.git
$CMD cd reactnd-project-readable-starter/
$CMD npm install
$CMD node server
```

see https://github.com/udacity/reactnd-project-readable-starter for details.

## Running App
Enter the App direcotry
```
$CMD cd ReactND.P2.Readable
```

At the command line enter:
```
$CMD npm start
```

Enter the URL
```
http://localhost:3000
```
in a brower address bar

## Custom Installation

If you wish to install the required server on a different port and or host, the location and port will need to be changed in the 
ReactND.P2.Readable/.env file.  

```
REACT_APP_SERVER_URL="http://localhost:5001"
```

Replace localhost with the hostname or ip address, and replace 5001 with the port number.

If the App is already running, you must stop it and rerun 
```
$CMD npm start
```
