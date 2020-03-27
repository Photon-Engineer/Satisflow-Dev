

//                   0          1            2               3               4      5            6        7         8           9                   
export const ores = ['Iron Ore','Copper Ore','Limestone Ore','Caternium Ore','Coal','Raw Quartz','Sulfur','Bauxite','S.A.M Ore','Uranium'];
//                     0            1              2                 3 
export const ingots = ['Iron Ingot','Copper Ingot','Caternium Ingot','Steel Ingot'];
export const purity = ['Impure','Normal','Pure']
export const minerLevel = ['Mk 1','Mk 2','Mk 3']

export const smelterRecipes = {
    //       Iron       Copper     Caternium
    in:     [ores[0]   ,ores[1]  , ores[3]],
    inppm:  [30        ,30       , 45],
    out:    [ingots[0] ,ingots[1], ingots[2]],
    outppm: [30        ,30       , 15],
}
