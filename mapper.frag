#version 330 compatibility
in vec3  vReflectVector;

uniform samplerCube uReflectUnit;
void
main( )
{
vec4 newcolor = textureCube( uReflectUnit, vReflectVector );

gl_FragColor = vec4( newcolor.rgb, 1. );
}