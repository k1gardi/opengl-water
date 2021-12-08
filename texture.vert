#version 330 compatibility
out  vec3  vNormal;

void
main( )
{
	vNormal = normalize( gl_Normal );
	gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
}