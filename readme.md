# cardboardcity-webgui

[![Build Status](https://travis-ci.org/montyanderson/cardboardcity-webgui.svg)](https://travis-ci.org/montyanderson/cardboardcity-webgui)
[![Dependency Status](https://david-dm.org/montyanderson/cardboardcity-webgui.svg)](https://david-dm.org/montyanderson/cardboardcity-webgui)
[![devDependency Status](https://david-dm.org/montyanderson/cardboardcity-webgui/dev-status.svg)](https://david-dm.org/montyanderson/cardboardcity-webgui#info=devDependencies)

A web interface for the Cardboard City art exhibition.

* The view as of 10/7/2015

![screenshot](https://i.imgur.com/3TVvlGM.png)

## Install

* Install [node.js](https://nodejs.org/).

* Clone git repository or download a zip:

``` bash
git clone https://github.com/montyanderson/cardboardcity-webgui.git
```

* Install dependencies.

``` bash
cd cardboardcity-webgui
npm install # This may require 'sudo' on Linux
npm run prepublish
```

* Start the server.

``` bash
npm start
```

* Go to [localhost:8080](http://localhost:8080) in your browser.

## Pulling

``` bash
git pull origin master
npm run prepublish
node server
```

## To Do

* ~~User-based suggestions~~

* Moderated or ~~authenticated~~ suggestions

* ~~Some way of limiting votes per-user~~

* Different views: those being built, those built, suggestions

* 4 states for each building: unapproved, approved, being built, built

* Linear progressions between views (maybe animations?)

* ~~Should be able to run on as Raspberry Pi 2~~
