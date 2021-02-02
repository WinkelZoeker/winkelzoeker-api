export default function logicalXOR(a:boolean, b:boolean): boolean {
  return ( a || b ) && !( a && b );
}
