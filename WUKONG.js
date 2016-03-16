// 2016 Andrew V. Butt Sr.  Pryme8@gmail.com
//This is a Babylon.js Playground Extension, using this plugin you accept all terms and aggreements presented in the TOU for the offcial Babylon.js Playground.
/*THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.*/



WUKONG = function(){
if(!$('#WUKONG').length){
this._init();
}
};

WUKONG.prototype._init = function(){
	
	$("head").append("<link href='http://pryme8.github.io/WUKONG/WUKONG.css' type='text/css' rel='stylesheet' />");
	var buttonHTML = 	"<span id='WUKONG_BUTTON'>WUKONG</span>"+
						"<ul id='WUKONG_LIST'>";
		buttonHTML += "<li><input type='checkbox' id='hints' checked />&frasl;h<input type='checkbox' id='members' />&frasl;mb<input type='checkbox' id='methods' />&frasl;md</li>";
	
	
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
			var string = "";
			if(prefab.data.hints && $('#WUKONG #hints').is(':checked')){
				string += String(prefab.data.hints)+'\n\r<BR />';
			}
			if(prefab.data.members && $('#WUKONG #members').is(':checked')){
				string += String(prefab.data.members)+'\n\r<BR />';
			}
			if(prefab.data.methods && $('#WUKONG #methods').is(':checked')){
				string += String(prefab.data.methods)+'\n\r<BR />';
			}
			string += String(prefab.data.string);
			
				$("#WUKONG").find('copy').html(string);
	
			  var element = $("#WUKONG").find('copy')[0];  
  				var range = document.createRange();  
 				range.selectNode(element);  
 				window.getSelection().addRange(range);  
				try {  
    				// Now that we've selected the anchor text, execute the copy command  
    				var successful = document.execCommand('copy');  
    				var msg = successful ? 'successful' : 'unsuccessful';  
    				console.log('Copy command was ' + msg);  
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
		CreateBox : {
			data :{
				string: "BABYLON.Mesh.CreateBox('box', 6.0, scene, false, BABYLON.Mesh.DEFAULTSIDE);",
				hints : "//Box(id, scene, size, canBeRegenerated, mesh, side)",
				members : "//Members - size : number, side : number",
				methods : "//Methods - copy(id) -> Geometry, serialize() -> any, static Parse(parsedBox, scene) -> Box"
				}
		},
		CreateSphere : {
			data :{
				string: "BABYLON.Mesh.CreateSphere('sphere', 10.0, 10.0, scene, false,  BABYLON.Mesh.DEFAULTSIDE);",
				hints : "//Sphere(id, scene, segments, diameter, canBeRegenerated, mesh, side)",
				members : "//Members - segments : number, diameter : number, side : number",
				methods : "//Methods - copy(id) -> Geometry, serialize() -> any, static Parse(parsedSphere, scene) -> Sphere"
				}
		},
		CreatePlane : {
			data :{
				string: "BABYLON.Mesh.CreatePlane('plane', 10.0, scene, false, BABYLON.Mesh.DEFAULTSIDE);",
				hints : "//Plane(id, scene, size, canBeRegenerated, mesh, side)",
				members : "//Members - size : number, side : number",
				methods : "//Methods - copy(id) -> Geometry, serialize() -> any, static Parse(parsedPlane, scene) -> Plane"
				}
		},
		CreateDisc : {
			data :{
				string: "BABYLON.Mesh.CreateDisc('disc', 5, 30, scene, false, BABYLON.Mesh.DEFAULTSIDE);",
				hints : "//Disc(id, scene, radius, tessellation, canBeRegenerated, mesh, side)",
				members : "//Members - radius : number, tessellation : number, side : number",
				methods : "//Methods - copy(id) -> Geometry"
				}
		}
		
	},
	Cameras :{
		Standard :{
			FreeStandard :{
				data :{
				string: "new BABYLON.FreeCamera(name, position, scene);",
				hints : "//FreeCamera(name,position,scene)",
				members : "//Members - ellipsoid : Vector3, keysUp : number[], keysDown : number[], keysLeft : number[], keysRight : number[], checkCollisions : boolean, applyGravity : boolean, angularSensibility : number, onCollide : (collidedMesh: AbstractMesh) => void",
				methods : "//Methods - attachControl(element, noPreventDefault) => void, detachControl(element) => void, serialize() => any"
				}
			},
			ArcRotateStandard :{
				data :{
				string: "new BABYLON.ArcRotateCamera(name, alpha, beta, radius, target, scene);",
				hints : "//ArcRotateCamera(name, alpha, beta, radius, target, scene)",
				members : "//Members - alpha : number, beta : number, radius : number, target : any, inertialAlphaOffset : number, inertialBetaOffset : number, inertialRadiusOffset : number, lowerAlphaLimit : any, upperAlphaLimit : any, lowerBetaLimit : number, upperBetaLimit : number, lowerRadiusLimit : any, upperRadiusLimit : any, angularSensibilityX : number, angularSensibilityY : number, wheelPrecision : number, pinchPrecision : number, panningSensibility : number, inertialPanningX : number, inertialPanningY : number, keysUp : number[], keysDown : number[], keysLeft : number[], keysRight : number[], zoomOnFactor : number, targetScreenOffset : Vector2, pinchInwards : boolean, allowUpsideDown : boolean, panningAxis : Vector3, onCollide : (collidedMesh: AbstractMesh) => void, checkCollisions : boolean, collisionRadius : Vector3, angularSensibility : number",
				methods : "//Methods - attachControl(element, noPreventDefault, useCtrlForPanning) -> void, detachControl(element) -> void, setPosition(position) -> void, setTarget(target) → void, zoomOn(meshes, doNotUpdateMaxZ) -> void, focusOn(meshesOrMinMaxVectorAndDistance, doNotUpdateMaxZ) -> void, createRigCamera(name, cameraIndex) -> Camera, serialize() -> any",
				}
			},
			TouchStandard : {
				data :{
				string: "new BABYLON.TouchCamera(name, position, scene);",
				hints : "//TouchCamera(name, position, scene)",
				members : "//Members - touchAngularSensibility : number, touchMoveSensibility : number",
				methods : "//Methods - attachControl(canvas, noPreventDefault) -> void, detachControl(canvas) -> void",
				}
			},
			DeviceOStandard : {
				data :{
				string: "new DeviceOrientationCamera(name, position, scene);",
				hints : "//DeviceOrientationCamera(name, position, scene)",
				members : "//Members - angularSensibility : number, moveSensibility : number",
				methods : "//Methods - attachControl(canvas, noPreventDefault) -> void, detachControl(canvas) -> void",
				}
			},
			FollowStandard:{
				data :{
				string: "new BABYLON.FollowCamera(name, position, scene);",
				hints : "//FollowCamera(name, position, scene)",
				members : "//Members - radius : number, rotationOffset : number, heightOffset : number, cameraAcceleration : number, maxCameraSpeed : number, target : AbstractMesh",
				methods : "//Methods - serialize() -> any",
				}
			},
			VirtualJoyStandard:{
				data :{
				string: "new BABYLON.VirtualJoysticksCamera(name, position, scene);",
				hints : "//VirtualJoysticksCamera(name, position, scene)",
				members : "//Members - None",
				methods : "//Methods - getLeftJoystick() -> VirtualJoystick, getRightJoystick() -> VirtualJoystick, dispose() -> void",
				}
			},
			GamepadStandard :{
				data :{
				string: "new BABYLON.GamepadCamera(name, position, scene);",
				hints : "//GamepadCamera(name, position, scene)",
				members : "//Members - angularSensibility : number, moveSensibility : number",
				methods : "//Methods - dispose() -> void",
				}
			},
		},
		Anaglyph:{
			FreeAnaglyph :{
				data :{
				string: "new BABYLON.AnaglyphFreeCamera(name, position, interaxialDistance, scene);",
				hints : "//AnaglyphFreeCamera(name, position, interaxialDistance, scene)",
				members : "//Members - interaxialDistance : number",
				methods : "//Methods - None",
				}
			},
			ArcRotateAnaglyph :{
				data :{
				string: "new BABYLON.AnaglyphArcRotateCamera(name, alpha, beta, radius, target, interaxialDistance, scene);",
				hints : "//AnaglyphArcRotateCamera(name, alpha, beta, radius, target, interaxialDistance, scene)",
				members : "//Members - None",
				methods : "//Methods - None",
				}
			}	
		},		
	},
	Lights : {
		PointLight : {
			data :{
				string: "new BABYLON.PointLight(name, position, scene);",
				hints : "//PointLight(name, position, scene)",
				members : "//Members - position : Vector3",
				methods : "//Methods - getAbsolutePosition() -> Vector3, computeTransformedPosition() -> boolean, transferToEffect(effect, positionUniformName) -> void, needCube() -> boolean, supportsVSM() -> boolean, needRefreshPerFrame() -> boolean, getShadowDirection(faceIndex) -> Vector3, setShadowProjectionMatrix(matrix, viewMatrix, renderList) -> void,se rialize() -> any",
				}
		},
		DirectionalLight : {
			data :{
				string: "new BABYLON.DirectionalLight(name, direction, scene);",
				hints : "//DirectionalLight(name, direction, scene)",
				members : "//Members - direction : Vector3, position : Vector3, transformedPosition : Vector3, shadowOrthoScale : number, autoUpdateExtends : boolean",
				methods : "//Methods - getAbsolutePosition() -> Vector3, setDirectionToTarget(target) -> Vector3, setShadowProjectionMatrix(matrix, viewMatrix, renderList) -> void, supportsVSM() -> boolean, needRefreshPerFrame() -> boolean, needCube() -> boolean, getShadowDirection(faceIndex) -> Vector3, computeTransformedPosition() -> boolean, transferToEffect(effect, directionUniformName) -> void, serialize() -> any",
				}
		},
		SpotLight : {
			data :{
				string: "new BABYLON.SpotLight(name, position, direction, angle, exponent, scene);",
				hints : "//SpotLight(name, position, direction, angle, exponent, scene)",
				members : "//Members - position : Vector3, direction : Vector3, angle : number, exponent : number, transformedPosition : Vector3",
				methods : "//Methods - getAbsolutePosition() -> Vector3, setShadowProjectionMatrix(matrix, viewMatrix, renderList) -> void, needCube() -> boolean, supportsVSM() -> boolean, needRefreshPerFrame() -> boolean, getShadowDirection(faceIndex) -> Vector3, setDirectionToTarget(target) -> Vector3, computeTransformedPosition() -> boolean, transferToEffect(effect, positionUniformName, directionUniformName) -> void, serialize() -> any",
				}
		},
		HemisphericLight : {
			data :{
				string: "new BABYLON.HemisphericLight(name, direction, scene);",
				hints : "//HemisphericLight(name, direction, scene)",
				members : "//Members - direction : Vector3, groundColor : Color3",
				methods : "//Methods - setDirectionToTarget(target) -> Vector3, getShadowGenerator() -> ShadowGenerator, transferToEffect(effect, directionUniformName, groundColorUniformName) -> void, serialize() -> any",
				}
		},
	}
	
}




$(document).ready(function(e) {
 WU = new WUKONG();
});