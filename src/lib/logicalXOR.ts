export default function logicalXOR(a:boolean, b:boolean) {
  return ( a || b ) && !( a && b );
}