#version 330 compatibility
uniform samplerCube uTexUnit;

in  vec3   vNormal;

void
main( )
{
	vec4 newcolor = textureCube( uTexUnit, vNormal );
	gl_FragColor = vec4( newcolor.rgb, 1. );
}