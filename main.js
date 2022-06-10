  quick_draw_set_data=["ant","aircraft carrier","cup","alarm clock"];
  random_no = Math.floor((Math.random()*quick_draw_set_data.length)+1);
  sketch = quick_draw_set_data[random_no];

  document.getElementById("sketch_to_be_drawn").innerHTML = " Sketch To Be Drawn : " +sketch;

  timer_counter =0;
  timer_check= "";
  drawn_sketch ="";
  answer_holder="";
  score =0;     
 
  function preload(){
    classifier=ml5.imageClassifier('DoodleNet');
  }

  function setup(){
    canvas = createCanvas(280,280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas)
  }
  
  function draw(){

    strokeWeight(14);
   stroke(0);

   if(mouseIsPressed){
        line(pmouseX,pmouseY,mouseX,mouseY)
   }

    check_sketch();
    if(drawn_sketch == sketch){
      answer_holder = "set";
      score = score+1;
      document.getElementById("score").innerHTML ="Score :" +score;
    }

  }

   function check_sketch(){
     timer_counter++;
     document.getElementById("timer").innerHTML = "Timer :"+timer_counter;
     if(timer_counter>500){
       timer_counter = 0;
       timer_check ="completed";
     }
     if(timer_check == "completed" || answer_holder == "set"){
       timer_check = "";
       answer_holder= "";
       update_canvas();
     }
   }

   function update_canvas(){
     background("white");
     random_no = Math.floor((Math.random()*quick_draw_set_data.length)+1);
     sketch = quick_draw_set_data[random_no];
     document.getElementById("sketch_to_be_drawn").innerHTML = "Sketch To Be Drawn: "+sketch;
   }

   function classifyCanvas(){
     classifier.classify(canvas,gotResult);
   }

   function gotResult(error,results){
       if(error){
         console.log(error);
       }
       else{
         console.log(results);
         drawn_sketch=results[0].label;
         document.getElementById('label').innerHTML = "Your Skecth"+ drawn_sketch;
         document.getElementById("confidence").innerHTML = "Confidence" + Math.round(results[0].confidence * 100)+ "%"
       }
   }
