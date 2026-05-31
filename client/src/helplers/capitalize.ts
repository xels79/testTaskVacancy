const capitalizeFIO = ( s: string ):string => s
    .split(' ')
    .map( it => it.length?( it.charAt(0) + it.slice(1) ):it )
    .join(' ');

export default capitalizeFIO;