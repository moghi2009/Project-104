Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function capture(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="imageCaptured"style: width="190px" height="190px" src="'+data_uri+'"/>';
    })
}
console.log('ml5 version: ', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/3X2Hi95At/model.json', modelLoaded);
function modelLoaded(){
    console.log("modelLoaded");
}
function identify(){
    captured_image = document.getElementById("imageCaptured");
    classifier.classify(captured_image, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("p-object").innerHTML = results[0].label;
        document.getElementById("p-accuracy").innerHTML = results[0].confidence.toFixed(3);
    }
}