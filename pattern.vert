#version 330 compatibility
uniform float	uUndulate;			// "Time", from Animate( )
out vec2  		vST;			// texture coords
out vec3		vColor;
out vec3		vNormal;

// lighting stuff
out  vec3  vN;		// normal vector
out  vec3  vL;		// vector from point to light
out  vec3  vE;		// vector from point to eye
vec3 LightPosition = vec3(  0., 8., 8. );

const float PI = 	3.14159265;
const float AMP = 	0.2;		// amplitude
const float W = 	2.;			// frequency


void
main( )
{ 
	// Lighting   **********************************************************
	vec3 vert = gl_Vertex.xyz;
	vec4 ECposition = gl_ModelViewMatrix * vec4( gl_Vertex.xyz, 1. );
	vN = normalize( gl_NormalMatrix * gl_Normal );	// normal vector
	vL = LightPosition - ECposition.xyz;		// vector from the point
							// to the light position
	vE = vec3( 0., 0., 0. ) - ECposition.xyz;	// vector from the point
							// to the eye position 
	//gl_Position = gl_ModelViewProjectionMatrix * vec4( vert, 1. );



	// Deformation **********************************************************
	vST = gl_MultiTexCoord0.st;
	vec3 norm = normalize(gl_Normal);
	vNormal = normalize(gl_NormalMatrix * gl_Normal);
	if (uUndulate > 0)
	{

		float disp =  uUndulate * ( sin( 2 * PI  * vST.s) + cos(2 * PI * vST.t));
		vec4 pos = gl_ModelViewMatrix * gl_Vertex;

		vert += norm * disp;
	}
	//vColor = pos.xyz;
	gl_Position = gl_ModelViewProjectionMatrix * vec4( vert, 1. );
}
