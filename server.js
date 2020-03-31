var express = require('express');
var app = express();
var path = require('path');
var Pusher = require('pusher');
var bodyParser = require('body-parser');
var jsdom = require('jsdom').JSDOM;
var fs = require('fs');

var pusher = new Pusher({
  appId: '972391',
  key: '790fdb900a93dbafe8ee',
  secret: '4c3dac8384b761886635',
  cluster: 'ap2',
  encrypted: true
});

// viewed at http://localhost:8080
app.use(bodyParser.json());
    app.use(
        "/", //the URL throught which you want to access to you static content
        express.static(__dirname) //where your static content is located in your filesystem
    );

    app.use(express.urlencoded())

    app.post('/www.stageit.com/static/showcreated.html', (req, res) => {
        const username = req.body.username;
        const imgurl = req.body.imageurl;
        var showtitle = req.body.title;
        var fixshowtitle = showtitle;
        showtitle = showtitle.split(" ").join("");
        const showtime = req.body.datetime;
        const showprice = req.body.showprice;
        const obs = req.body.obs;
        const description = req.body.description;
        //...
        var uri = path.join(__dirname + "/www.stageit.com/damian_mcginty/young_forever_turns_one/createshowgt.html");
        jsdom.fromFile(uri).then(function (dom) {
 
          let window = dom.window,
          document = window.document;
          document.getElementsByClassName("performance_image")[0].src = imgurl;
          document.getElementsByClassName("display_name")[0].textContent = username;
          document.getElementsByClassName("display_title")[0].textContent = fixshowtitle;
          document.getElementsByClassName("display_time")[0].textContent = "Time: " + showtime + " Price: " + showprice;
          document.getElementById("ticket_price").textContent = "Ticket Price: " + showprice + "$";
          document.getElementById("show_descr").textContent = description;
          fs.writeFileSync(path.join(__dirname + "/www.stageit.com/damian_mcginty/young_forever_turns_one/" + showtitle + "gt.html"),document.documentElement.outerHTML);
       
      }).catch (function (e) {
       
          console.log(e);
       
      });
      uri = path.join(__dirname + "/www.stageit.com/damian_mcginty/young_forever_turns_one/createshowst.html");

      jsdom.fromFile(uri).then(function (dom) {
 
        let window = dom.window,
        document = window.document;
        document.getElementsByClassName("performance_image")[0].src = imgurl;
        document.getElementsByClassName("display_name")[0].textContent = username;
        document.getElementsByClassName("display_title")[0].textContent = fixshowtitle;
        document.getElementsByClassName("display_time")[0].textContent = "Time: " + showtime + " Price: " + showprice;
        document.getElementById("ticket_price").textContent = "Ticket Price: " + showprice + "$";
        document.getElementById("show_descr").textContent = description;
        document.getElementById("obs_link").src = "//iframe.dacast.com/b/157094/c/530206";
        fs.writeFileSync(path.join(__dirname + "/www.stageit.com/damian_mcginty/young_forever_turns_one/" + showtitle + "st.html"),document.documentElement.outerHTML);
     
    }).catch (function (e) {
     
        console.log(e);
     
    });
    uri = path.join(__dirname + "/www.stageit.com/shows.html");
    jsdom.fromFile(uri).then(function (dom) {
 
      let window = dom.window,
      document = window.document;
      document.getElementById("showscreated").innerHTML = document.getElementById("showscreated").innerHTML + "<li class='small_show show_list' data-is-started='false' data-performance-id='71801' data-start-time='1585337400000'><a href='damian_mcginty/young_forever_turns_one/" + showtitle + "gt.html' class='show_square'><img class='small_show_image' src='" + imgurl + "' /></a><div class='small_info'><a href='damian_mcginty/young_forever_turns_one/" + showtitle + "gt.html' class='headliner'><h4>" + username + "<img alt='Verified-artist' class='verified regular' data-tooltip-animation='true' data-tooltip-append-to-body='true' data-tooltip-class='black-tooltip' data-tooltip='This artist is verified' src='../d2tp1vr1gg6ixe.cloudfront.net/assets/profile/verified-artist-ecb64ec83c51bb34833daabd8402f293.png' /></h4><div class='title'>" + fixshowtitle + "</div></a><div class='date'><span>" + showtime + "</span></div></div><div class='enter_venue'><form action='damian_mcginty/young_forever_turns_one/" + showtitle + "gt.html' class='button_to' method='get'><div><input class='enter_button' id='enter_button_71801' name='enter' type='submit' value='Enter Venue' /></div></form></div></li>";
      fs.writeFileSync(path.join(__dirname + "/www.stageit.com/shows.html"),document.documentElement.outerHTML);
   
  }).catch (function (e) {
   
      console.log(e);
   
  });
        console.log(username);
        res.end()
      })
      app.post('/payment', function(req,res){
        var showname = req.body.showname;
        var buyername = req.body.buyername;
        var uri = path.join(__dirname + "/www.stageit.com/damian_mcginty/young_forever_turns_one/" + showname + "st.html");
        jsdom.fromFile(uri).then(function (dom) {
 
          let window = dom.window,
          document = window.document;
          document.getElementById('valid_users').value = document.getElementById('valid_users').value + "," + buyername;
          fs.writeFileSync(path.join(__dirname + "/www.stageit.com/damian_mcginty/young_forever_turns_one/" + showname + "st.html"),document.documentElement.outerHTML);
       
      }).catch (function (e) {
       
          console.log(e);
       
      });
      uri = path.join(__dirname + "/www.stageit.com/damian_mcginty/young_forever_turns_one/" + showname + "gt.html");
      jsdom.fromFile(uri).then(function (dom) {
 
        let window = dom.window,
        document = window.document;
        document.getElementById('valid_users').value = document.getElementById('valid_users').value + "," + buyername;
        fs.writeFileSync(path.join(__dirname + "/www.stageit.com/damian_mcginty/young_forever_turns_one/" + showname + "gt.html"),document.documentElement.outerHTML);
     
    }).catch (function (e) {
     
        console.log(e);
     
    });
      });

      app.post('/comment', function(req, res){
        console.log(req.body.channel);
        var newComment = {
          name: req.body.name,
    email: req.body.email,
    comment: req.body.comment,
    channel: req.body.channel,
    img_url: req.body.img_url
        }
        pusher.trigger(newComment.channel, 'new_comment', newComment);
        res.json({  created: true });
      });
      
      // Error Handler for 404 Pages
      // app.use(function(req, res, next) {
      //     var error404 = new Error('Route Not Found');
      //     error404.status = 404;
      //     next(error404);
      // });
      
      module.exports = app;
      
app.listen(8080);