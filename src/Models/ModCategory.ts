export type ModCategory = 'stage'|'ui'|'char'|'fighter'|'effect'|'param'|'audio'|'music'|'misc'
export type ArcropolisModCategory = 'Fighter'|'Stage'|'Effects'|'UI'|'Param'|'Audio'|'Misc'
export const NameToCategoryMapping:{[name in ModCategory]:ArcropolisModCategory} = {
    char:'Fighter',
    fighter:'Fighter',
    stage:'Stage',
    effect:'Effects',
    ui:'UI',
    param:'Param',
    audio:'Audio',
    music:'Audio',
    misc:'Misc',
}