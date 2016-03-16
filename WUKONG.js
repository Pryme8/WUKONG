// 2016 Andrew V. Butt Sr.  Pryme8@gmail.com
//This is a Babylon.js Playground Extension, using this plugin you accept all terms and aggreements presented in the TOU for the offcial Babylon.js Playground.
/*THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.*/



WUKONG = function(){
this._init();
};

WUKONG.prototype._init = function(){
	
	$("head").append("<link href='./StupidMonkey/WUKONG.css' type='text/css' rel='stylesheet' />");
	var buttonHTML = 	"<span id='WUKONG_BUTTON'>WUKONG</span>"+
						"<ul id='WUKONG_LIST'>";
		buttonHTML += "<li><input type='checkbox' id='hints' />&frasl;h<input type='checkbox' id='members' />&frasl;mb<input type='checkbox' id='methods' />&frasl;md</li>";
	
	
		function buildList(target){
			
			if(Object.keys(target).length){
				for(var i = 0; i < Object.keys(target).length; i++){
					var key = Object.keys(target)[i];
					var obj = target[key];
					if(key == "data"){return};
					buttonHTML += "<li>";
						
					if(obj['data']){
						
						buttonHTML += '<a id="'+key+'">';
						buttonHTML += key;
						buttonHTML += "</a>";
					}else{
						buttonHTML += key;
					}							
						if(Object.keys(obj).length){
							buttonHTML += "<ul>";
							buildList(obj);
							buttonHTML += "</ul>";
						}
						buttonHTML += "</li>"
				
				};
			};
			return;
		}
		
		
		buildList(WUKONG.PREFABS);
		buttonHTML += "</ul>";

	$('#topbar div.btn-group:nth-child(4)').after("<div id='WUKONG'>"+buttonHTML+"<copy></copy></div>");
	
	var parent = this;
	//BINDINGS 
	$("#WUKONG").find("a").bind('click',function(e){
		var prefab = $(e.target).attr('id');
		var prefabReturn= null;
		prefab = parent._scanPrefabs(WUKONG.PREFABS, prefab);
	});
	
	
	
	
}

WUKONG.prototype._copyPrefab = function(prefab){
	if(prefab!=null){
			var string = String(prefab.data.hints)+'\n\r<BR />'+String(prefab.data.string);
    			console.log(string);
				$("#WUKONG").find('copy').html(string);
				
		
			  var element = $("#WUKONG").find('copy')[0];  
  				var range = document.createRange();  
 				range.selectNode(element);  
 				window.getSelection().addRange(range);  
				try {  
    				// Now that we've selected the anchor text, execute the copy command  
    				var successful = document.execCommand('copy');  
    				var msg = successful ? 'successful' : 'unsuccessful';  
    				console.log('Copy email command was ' + msg);  
  				} catch(err) {  
   					 console.log('Oops, unable to copy');  
 				 }  
  // Remove the selections - NOTE: Should use
  // removeRange(range) when it is supported  
  window.getSelection().removeAllRanges();  

		}
	
	
}


WUKONG.prototype._scanPrefabs = function(target, prefab){
	
	if(Object.keys(target).length){
				for(var i = 0; i < Object.keys(target).length; i++){
					var key = Object.keys(target)[i];
					var obj = target[key];
					
					if(key == "data"){continue}
					
					console.log("scanning:"+key+" for:"+prefab+" i:"+i);
					
					if(obj[prefab]){
					console.log("key FOUND!");
					this._copyPrefab( obj[prefab]);
					}else{
						
							this._scanPrefabs(obj, prefab);
						
					}

				}			
	}
	
}

WUKONG.PREFABS = {
	Numbers : {
		Vector3 :{
			data :{
				string: "new BABYLON.Vector3(0,0,0);",
				hints : "//Vector3(x,y,z)",
				members : null,
				methods : null,
			}
		},
		Color3 : {
			data :{
				string: "new BABYLON.Color3(0,0,0);",
				hints : "//Vector3(r,g,b)",
				memebers : null,
				methods: null,
			}
		}
	},
	Basics : {
		
	},
	Cameras :{
		Standard :{
			FreeStandard :{
				data :{
				string: "new FreeCamera(name, position, scene);",
				hints : "//FreeCamera(name,position,scene)",
				members : "//Members - ellipsoid : Vector3, keysUp : number[], keysDown : number[], keysLeft : number[], keysRight : number[], checkCollisions : boolean, applyGravity : boolean, angularSensibility : number, onCollide : (collidedMesh: AbstractMesh) => void",
				methods : "//Methods - attachControl(element, noPreventDefault) => void, detachControl(element) => void, serialize() => any"
				}
			},
			ArcRotateStandard :{
				data :{
				string: "new ArcRotateCamera(name, alpha, beta, radius, target, scene);",
				hints : "//ArcRotateCamera(name, alpha, beta, radius, target, scene) \n\r<BR/>",
				members : "//Members - alpha : number, beta : number, radius : number, target : any, inertialAlphaOffset : number, inertialBetaOffset : number, inertialRadiusOffset : number, lowerAlphaLimit : any, upperAlphaLimit : any, lowerBetaLimit : number, upperBetaLimit : number, lowerRadiusLimit : any, upperRadiusLimit : any, angularSensibilityX : number, angularSensibilityY : number, wheelPrecision : number, pinchPrecision : number, panningSensibility : number, inertialPanningX : number, inertialPanningY : number, keysUp : number[], keysDown : number[], keysLeft : number[], keysRight : number[], zoomOnFactor : number, targetScreenOffset : Vector2, pinchInwards : boolean, allowUpsideDown : boolean, panningAxis : Vector3, onCollide : (collidedMesh: AbstractMesh) => void, checkCollisions : boolean, collisionRadius : Vector3, angularSensibility : number \n\r<BR/>",
				methods : "//Methods - attachControl(element, noPreventDefault, useCtrlForPanning) -> void, detachControl(element) -> void, setPosition(position) -> void, setTarget(target) → void, zoomOn(meshes, doNotUpdateMaxZ) -> void, focusOn(meshesOrMinMaxVectorAndDistance, doNotUpdateMaxZ) -> void, createRigCamera(name, cameraIndex) -> Camera, serialize() -> any",
				}
			},
			TouchStandard : {
			},
			DeviceOStandard : {
			},
			FollowStandard:{
			},
			VirtualJoyStandard:{
			}
		},
		Anaglyph:{
			FreeAnaglyph :{
			},
			ArcRotateAnaglyph :{
			}	
		},
		Gamepad :{
		},
		VRDevice : {
		}
		
	}
	
}


$(document).ready(function(e) {
    stupidMonkey = new WUKONG();
});