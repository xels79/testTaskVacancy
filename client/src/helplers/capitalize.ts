const capitalizeFIO = ( s: string ):string => s
    .split(' ')
    .map( it => it.length?( it.charAt(0).toLocaleUpperCase() + it.slice(1) ):it )
    .join(' ');

export default capitalizeFIO;