#version 330 compatibility

out vec3  vReflectVector;
void
main( )
{
	vec3 ECposition = ( gl_ModelViewMatrix * gl_Vertex ).xyz;
	vec3 eyeDir = ECposition - vec3(0.,0.,0.);			// vector from eye to pt
	vec3 normal = normalize( gl_NormalMatrix * gl_Normal );

	vReflectVector = reflect( eyeDir, normal );

	gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
}