var SIZE = 400

var prop = SIZE/10

var canvas = document.getElementById('base');
var ctx = canvas.getContext('2d');

var frames = []
var atualFrame = 1
var atualDraw = []

canvas.width = SIZE
canvas.height = SIZE

function setup() {    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var frame = [[],[],[],[],[],[],[],[],[],[]]
    for(var i=0;i<10;i++) {
        for(var j=0;j<10;j++) {
            ctx.fillStyle = `#f5e4b8`
            fillsqr(i, j)
            frame[i][j] = `#f5e4b8`
        }
    }    
    atualDraw = frame
    drawInsideFrame()
}

function drawInsideFrame() {
    canvas.onclick = function (e) {        
        if(e.type == 'click') {                
            var rect = canvas.getBoundingClientRect();
            var x = e.clientX - rect.left
            var y = e.clientY - rect.top
            
            x = parseInt(poss(x).toString()[0])
            y = parseInt(poss(y).toString()[0])

            ctx.fillStyle = document.getElementById('color').value
            atualDraw[y][x] = document.getElementById('color').value

            fillsqr(x, y)            
        }
    }
}

function nextFrame() {
    frames[atualFrame-1] = atualDraw
    setup()    
    atualFrame = atualFrame + 1    
    document.getElementById('atual').innerHTML = atualFrame
}

function delay(ms) {
    return new Promise(res => setTimeout(res, ms));
}

async function run() {
    for(var x =0; x<frames.length; x++) {                                                    
        var frame = frames[x]
        for(var i=0; i<10;i++) {
            for(var j=0; j<10;j++) {                    
                ctx.fillStyle = frame[j][i]
                fillsqr(i, j)                      
            }
        }
        await delay(300)
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    run()
}

function previousFrame() {
    if(atualFrame > 1) {
        atualFrame = atualFrame - 1    
        document.getElementById('atual').innerHTML = atualFrame
    }   
}

function pos(a) {
    return (prop*a)
}

function fillsqr(i, j) {
    return ctx.fillRect(pos(i)+0.2,pos(j)+0.2, prop-0.4, prop-0.4)
}

function poss(a) {
    return (a/prop)
}

function main() {
    setup()
}

main()