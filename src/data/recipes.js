

//                   0          1            2               3               4      5            6        7         8           9                   
export const ores = ['Iron Ore','Copper Ore','Limestone Ore','Caternium Ore','Coal','Raw Quartz','Sulfur','Bauxite','S.A.M Ore','Uranium'];
//                     0            1              2                 3 
export const ingots = ['Iron Ingot','Copper Ingot','Caternium Ingot','Steel Ingot'];

export const allItems = ["A.I. Limiter","Adaptive Control Unit","Alclad Aluminum Sheet","Alien Carapace","Alien Organs","Alumina Solution","Aluminum Ingot","Aluminum Scrap","Automated Wiring","Battery","Bauxite","Beacon","Biomass","Black Powder","Cable","Cartridge","Caterium Ingot","Caterium Ore","Circuit Board","Coal","Color Cartridge","Compacted Coal","Computer","Concrete","Copper Ingot","Copper Ore","Copper Sheet","Crude Oil","Crystal Oscillator","Electromagnetic Control Rod","Empty Canister","Encased Industrial Beam","Fabric","Filter","Flower Petals","Fuel","Heat Sink","Heavy Modular Frame","Heavy Oil Residue","High-Speed Connector","Iodine Infused Filter","Iron Ingot","Iron Ore","Iron Plate","Iron Rod","Leaves","Limestone","Liquid Biofuel","Modular Engine","Modular Frame","Motor","Mycelia","Nobelisk","Nuclear Fuel Rod","Packaged Fuel","Packaged Heavy Oil Residue","Packaged Liquid Biofuel","Packaged Oil","Packaged Turbofuel","Packaged Water","Petroleum Coke","Plastic","Polymer Resin","Power Shard","Quartz Crystal","Quickwire","Radio Control Unit","Raw Quartz","Reinforced Iron Plate","Rotor","Rubber","Screw","Silica","Smart Plating","Solid Biofuel","Stator","Steel Beam","Steel Ingot","Steel Pipe","Sulfur","Sulfuric Acid","Supercomputer","Turbo Motor","Turbofuel","Uranium","Uranium Cell","Uranium Pellet","Versatile Framework","Water","Wire","Wood"];

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

/*
export const constructorRecipes = {
    in: ['Iron Ingot','Iron Ingot','Copper Ingot','Wire','Leaves','Limestone','Iron Rod','Wood','Green Power Slug','Biomass','Steel Ingot','Steel Ingot','Mycelia','Flower Petals','Iron Rod','Alien Carapace','Yellow Power Slug','Caterium Ingot','Purple Power Slug','Raw Quartz','Raw Quartz'],
    inppm: [30,15,15,60,120,45,10,60,6,120,60,30,150,37.5,15,15,4,12,3,22.5,37.5],
    out: ['Iron Plate','Iron Rod','Wire','Cable','Biomass','Concrete','Screw','Biomass','Power Shard','Solid Biofuel','Steel Beam','Steel Pipe','Biomass','Color Cartridge','Spiked Rebar','Biomass','Power Shard','Quickwire','Power Shard','Silica','Quartz Crystal'],
    outppm: [20,15,30,30,60,15,40,300,6,60,15,20,150,75,15,1500,8,60,15,37.5,22.5],
    name: ['Iron Plate','Iron Rod','Wire','Cable','Biomass (Leaves)','Concrete','Screw','Biomass (Wood)','Power Shard (1)','Solid Biofuel','Steel Beam','Steel Pipe','Biomass (Mycelia)','Color Cartridge','Spiked Rebar','Biomass (Alien)','Power Shard (2)','Quickwire','Power Shard (3)','Silica','Quartz Crystal'],
}
*/

export const constructorRecipes = {
    name:["Iron Plate","Iron Rod","Alternate: Steel Rod","Wire","Alternate: Iron Wire","Alternate: Caterium Wire","Cable","Biomass (Leaves)","Concrete","Screw","Alternate: Casted Screw","Alternate: Steel Screw","Biomass (Wood)","Biomass (Alien Carapace)","Biomass (Mycelia)","Solid Biofuel","Color Cartridge","Steel Beam","Steel Pipe","Copper Sheet","Empty Canister","Quickwire","Quartz Crystal","Biomass (Alien Organs)","Alternate: Wood Coal","Alternate: Biomass Coal","Silica"],
    in:["Iron Ingot","Iron Ingot","Steel Ingot","Copper Ingot","Iron Ingot","Caterium Ingot","Wire","Leaves","Limestone","Iron Rod","Iron Ingot","Steel Beam","Wood","Alien Carapace","Mycelia","Biomass","Flower Petals","Steel Ingot","Steel Ingot","Copper Ingot","Plastic","Caterium Ingot","Raw Quartz","Alien Organs","Wood","Biomass","Raw Quartz"],
    inppm:[30,15,12,15,12.5,15,60,120,45,10,12.5,5,60,15,150,120,37.5,60,30,20,30,12,37.5,15,15,37.5,22.5],
    out:["Iron Plate","Iron Rod","Iron Rod","Wire","Wire","Wire","Cable","Biomass","Concrete","Screw","Screw","Screw","Biomass","Biomass","Biomass","Solid Biofuel","Color Cartridge","Steel Beam","Steel Pipe","Copper Sheet","Empty Canister","Quickwire","Quartz Crystal","Biomass","Coal","Coal","Silica"],
    outppm:[20,15,48,30,22.5,120,30,60,15,40,50,260,300,1500,2250,60,75,15,20,10,60,60,22.5,1500,150,45,37.5],
}

export const assemblerRecipes = {
    name:["Smart Plating","Versatile Framework","Automated Wiring","Alternate: Coated Iron Plate","Alternate: Steel Coated Plate","Alternate: Fused Wire","Alternate: Insulated Cable","Alternate: Quickwire Cable","Alternate: Fine Concrete","Alternate: Rubber Concrete","Reinforced Iron Plate","Alternate: Bolted Iron Plate","Alternate: Stitched Iron Plate","Alternate: Adhered Iron Plate","Rotor","Alternate: Steel Rotor","Alternate: Copper Rotor","Modular Frame","Alternate: Bolted Frame","Alternate: Steeled Frame","Encased Industrial Beam","Alternate: Encased Industrial Pipe","Stator","Alternate: Quickwire Stator","Motor","Circuit Board","Alternate: Silicone Circuit Board","Alternate: Caterium Circuit Board","Alternate: Electrode Circuit Board","Alternate: Crystal Computer","Alternate: Fused Quickwire","A.I. Limiter","Fabric","Black Powder","Alternate: Fine Black Powder","Nobelisk","Alternate: Compacted Coal","Alternate: Cheap Silica","Alclad Aluminum Sheet","Heat Sink","Alternate: Heat Exchanger","Encased Uranium Cell","Electromagnetic Control Rod","Alternate: Electromagnetic Connection Rod"],
    in:["Reinforced Iron Plate","Modular Frame","Stator","Iron Ingot","Steel Ingot","Copper Ingot","Wire","Quickwire","Silica","Limestone","Iron Plate","Iron Plate","Iron Plate","Iron Plate","Iron Rod","Steel Pipe","Copper Sheet","Reinforced Iron Plate","Reinforced Iron Plate","Reinforced Iron Plate","Steel Beam","Steel Pipe","Steel Pipe","Steel Pipe","Rotor","Copper Sheet","Copper Sheet","Plastic","Rubber","Circuit Board","Caterium Ingot","Copper Sheet","Mycelia","Coal","Sulfur","Black Powder","Coal","Raw Quartz","Aluminum Ingot","Alclad Aluminum Sheet","Alclad Aluminum Sheet","Uranium Pellet","Stator","Stator"],
    inppm:[2,2.5,2.5,50,7.5,12,45,7.5,7.5,50,30,90,18.75,11.25,20,10,22.5,3,7.5,2,24,28,15,16,10,15,27.5,12.5,30,7.5,7.5,25,15,7.5,7.5,15,25,11.25,60,40,37.5,40,6,10],
    in2:["Rotor","Steel Beam","Cable","Plastic","Plastic","Caterium Ingot","Rubber","Rubber","Limestone","Rubber","Screw","Screw","Wire","Rubber","Screw","Wire","Screw","Iron Rod","Screw","Steel Pipe","Concrete","Concrete","Wire","Quickwire","Stator","Plastic","Silica","Quickwire","Petroleum Coke","Crystal Oscillator","Copper Ingot","Quickwire","Biomass","Sulfur","Compacted Coal","Steel Pipe","Sulfur","Limestone","Copper Ingot","Rubber","Copper Sheet","Concrete","Ai Limiter","High Speed Connector"],
    inppm2:[2,30,50,10,5,3,30,5,30,10,60,250,37.5,3.75,100,30,195,12,140,10,30,20,40,60,10,30,27.5,37.5,45,2.8125,37.5,100,75,15,3.75,30,25,18.75,22.5,70,56.25,9,4,5],
    out:["Smart Plating","Versatile Framework","Automated Wiring","Iron Plate","Iron Plate","Wire","Cable","Cable","Concrete","Concrete","Reinforced Iron Plate","Reinforced Iron Plate","Reinforced Iron Plate","Reinforced Iron Plate","Rotor","Rotor","Rotor","Modular Frame","Modular Frame","Modular Frame","Encased Industrial Beam","Encased Industrial Beam","Stator","Stator","Motor","Circuit Board","Circuit Board","Circuit Board","Circuit Board","Computer","Quickwire","Ai Limiter","Fabric","Black Powder","Black Powder","Nobelisk","Compacted Coal","Silica","Alclad Aluminum Sheet","Heat Sink","Heat Sink","Uranium Cell","Em Control Rod","Em Control Rod"],
    outppm:[2,5,2.5,75,45,90,100,27.5,25,45,5,15,5.625,3.75,4,5,11.25,2,5,3,6,4,5,8,5,7.5,12.5,8.75,5,2.8125,90,5,15,7.5,15,3,25,26.25,30,10,13.125,10,4,10],
}