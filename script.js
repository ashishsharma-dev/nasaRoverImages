$(function() {
    $('#datepicker').datepicker();
});

$(function() {
    $('.tabs').tabs();
})

// $('#datepicker').change(function(e) {
//     e.preventDefault();
//     console.log($('#datepicker').val());
// });



$('.actionBtn').on('click', function() {
    let dateVal = $('#datepicker').val();
    let day = dateVal.substr(3, 2);
    let month = dateVal.substr(0, 2);
    let year = dateVal.substr(6, 4);
    let modifiedDateString = `${year}-${month}-${day}`



    let xhrData = new XMLHttpRequest();
    let count = 0;
    let add12more = 8;
    xhrData.onload = function() {
        let response = JSON.parse(this.response);
        let roverImagesArr = response.photos;

        $(window).scroll(function() {
            if ($(window).scrollTop() == $(document).height() - $(window).height()) {
                count = count + 8;
                add12more = add12more + 8;

                // console.log(count, add12more);
                // alert("bottom");
                let targetURL = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${modifiedDateString}&api_key=dCDs949bkcgxIicqOBl56vnE9mEM6pKe3LTgXFNd`;
                xhrData.open('GET', targetURL);
                xhrData.send();
            }
        });

        let slicedRoverImagesArr = roverImagesArr.slice(count, add12more);
        slicedRoverImagesArr.forEach((elem, i) => {
            // console.log(elem);
            let htmlData = `<div class="imageSection m10px br5px">
            <div class="imgBox">
                <img class="br5px" src="${elem.img_src}" alt="img${i}">
            </div>
            <div class="roverData">

            <div class="camera">
                <p class="camera_name"><strong>${elem.id}Camera Name:</strong> ${elem.camera.name}</p>
                <p class="camera_full_name"><strong>Camera Full Name:</strong> ${elem.camera.full_name}</p>
            </div>

            <div class="rover">
                <p class="rover_name"><strong>Rover Name:</strong> ${elem.rover.name}</p>
                <p class="rover_landing_date"><strong>Rover Landing Date:</strong> ${elem.rover.landing_date}</p>
                <p class="rover_launch_date"><strong>Rover Launch Date:</strong> ${elem.rover.launch_date}</p>
                <p class="rover_current_status"><strong>Rover Current Status:</strong> ${elem.rover.status}</p>
            </div>

            <div class="earth-date">
                <p class="earth_date"><strong>Earth Date:</strong> ${elem.earth_date}</p>
            </div>
        </div>
    </div>
</div>`
            $('.roverImages').append(htmlData);
        })
    }



    let targetURL = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${modifiedDateString}&api_key=dCDs949bkcgxIicqOBl56vnE9mEM6pKe3LTgXFNd`;
    xhrData.open('GET', targetURL);
    xhrData.send();
})