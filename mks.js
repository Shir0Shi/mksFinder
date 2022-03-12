let map;
let lat;
let long;
let timer;
$(function ()
{
    console.log("test");
    init();
    $("#start").on("click", function (){
        reload(10000);
    });
    $("#stop").on("click", function (){
        stop();
    });
    getMks();
});
function reload(t)
{
    timer = setTimeout(function check (){
        getMks();
        console.log("check");
        timer = setTimeout(check, t);
    }, t);
}
function stop()
{
    clearTimeout(timer);
}
function init()
{
    let lat = 50.451532;
    let long = 30.527516;
    let latlong = new google.maps.LatLng(lat, long);
    let mapOpt ={
      zoom: 5,
      center: latlong,
      mapTypeId: google.maps.MapTypeId.HYBRID
    };
    map = new google.maps.Map(document.getElementById("map"),mapOpt);
}
function getMks()
{
    $.getJSON("http://api.open-notify.org/iss-now.json", function (rez)
    {

        if(rez.message == "success")
        {
            let issPosition = rez.iss_position;
            let loc = new google.maps.LatLng(issPosition.latitude, issPosition.longitude);
            console.log(loc);
            let mark = new google.maps.Marker({
                position: loc,
                map: map,
                title: "MKS" + issPosition.latitude + issPosition.longitude
            });


            map.setCenter(loc, 10);
        }
    });
}