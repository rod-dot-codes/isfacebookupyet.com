# Is Facebook Up Yet?

[https://www.isfacebookupyet.com](https://www.isfacebookupyet.com)

### a Cloudflare Worker example

This is a simple CF Worker that took me less than an hour to build and deploy a primitive version. It would be faster, but my Javascript skills are weak.

I had to managle a few Worker examples into each other to create this, but at the end - it worked and quite reliabily.

Added Content Secuity Policy to show how that would look.

The calls to Google DOH JSON API (was so that we can do a simple resolve check without having to do a UDP call) - and it's cached but that shouldn't really be an issue if it did call for every user.

If that suceeds, it then looks for a correct status code. This was added after it came slightly right, for a few minutes after going live - it returned a status 500 on the Facebook www.facebook.com route

### Timeline

I registered the domain at Oct 4, 2021, 8:21 PM (5 hours ago) (SAST so UTC + 02:00) on CF Registrar, deployed the first working version at 9pm - 10pm (3.73k hits), 10pm - 11pm (800k), 11pm - 12pm (2k). It dropped off real fast after it was fixed.

I imagine actual clicks and viws are a lot lower, cause these also would be Opengraph pastes, and bots. There was a large swarm of Bot requests from China at one point.

### TODO

Make it templated so you can create these for any URL and host with one click...