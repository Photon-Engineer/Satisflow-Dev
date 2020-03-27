

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
    name:   ['Iron'    ,'Copper' ,'Caternium'],
}


export const constructorRecipes = {
    in: ['Iron Ingot','Iron Ingot','Copper Ingot','Wire','Leaves','Limestone','Iron Rod','Wood','Green Power Slug','Biomass','Steel Ingot','Steel Ingot','Mycelia','Flower Petals','Iron Rod','Alien Carapace','Yellow Power Slug','Caterium Ingot','Purple Power Slug','Raw Quartz','Raw Quartz'],
    inppm: [30,15,15,60,120,45,10,60,6,120,60,30,150,37.5,15,15,4,12,3,22.5,37.5],
    out: ['Iron Plate','Iron Rod','Wire','Cable','Biomass','Concrete','Screw','Biomass','Power Shard','Solid Biofuel','Steel Beam','Steel Pipe','Biomass','Color Cartridge','Spiked Rebar','Biomass','Power Shard','Quickwire','Power Shard','Silica','Quartz Crystal'],
    outppm: [20,15,30,30,60,15,40,300,6,60,15,20,150,75,15,1500,8,60,15,37.5,22.5],
    name: ['Iron Plate','Iron Rod','Wire','Cable','Biomass (Leaves)','Concrete','Screw','Biomass (Wood)','Power Shard (1)','Solid Biofuel','Steel Beam','Steel Pipe','Biomass (Mycelia)','Color Cartridge','Spiked Rebar','Biomass (Alien)','Power Shard (2)','Quickwire','Power Shard (3)','Silica','Quartz Crystal'],
}