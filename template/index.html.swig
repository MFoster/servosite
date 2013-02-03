{% extends 'layout.html.swig' %}

{% block content %}

	<label for="angle">Angle:</label>
	<input type="text" name="angle" id="angleInput"/>

{% endblock %}



{% block javascript %}
    {% parent %}
    
    <script type="text/javascript">
        var socket = io.connect('http://localhost:8081');
        
        
        $("angleInput").on('keypress', handleAngleInput);
        
        function handleAngleInput(e){
            var chr = String.fromCharCode(e.which);
            if(!/^[0-9]$/i.test(chr)){
                e.stop();
                return false;//not a number, bail
            }
            
            
            var value = parseInt(e.element().getValue() + chr, 10);
            
            if(!value){
                return true;//bunk value, most likely empty.
            }
            
            if(value > 180){
                value = 180;
            }

            e.element().setValue(value);//ensure within range
            socket.emit('twist', { angle : value });
            e.stop();//always stop event, we've already added the digit.
        }
        
    </script>

{% endblock %}