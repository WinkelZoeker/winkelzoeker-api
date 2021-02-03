/**
 * Logical XOR (bitwise) implementation
 *   Truth table
 * 
 *   A  B   Output
 *   0  0     0
 *   0  1     1
 *   1  0     1
 *   1  1     0
 * 
 * @param  {boolean} a
 * @param  {boolean} b
 * @returns boolean
 */
export default function logicalXOR(a:boolean, b:boolean): boolean {
  return ( a || b ) && !( a && b );
}
