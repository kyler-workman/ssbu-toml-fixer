export type ModCategory = 'stage'|'ui'|'char'|'effect'|'param'|'audio'|'misc'
export const NameToCategoryMapping:{[name in ModCategory]:string} = {
    char:'Fighter',
    stage:'Stage',
    effect:'Effects',
    ui:'UI',
    param:'Param',
    audio:'Audio',
    misc:'Misc',
}