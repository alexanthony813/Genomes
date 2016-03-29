sample_snps = [
    {'title': 'Eye Color', 'rs_id':'rs12913832', 'dnaPair':'GG', 'outcome':'Makes your eyes blue'},
    {'title': 'Eye Color', 'rs_id':'rs12913832', 'dnaPair':'AA', 'outcome':'Makes your eyes brown, or less likely blue'},
    {'title': 'Eye Color', 'rs_id':'rs12913832', 'dnaPair':'AG', 'outcome':'Makes your eyes brown'},

    {'title': 'Malaria Resistance', 'rs_id': 'rs8177374', 'dnaPair': 'CC', 'outcome': 'Normal resistance to Malaria'},
    {'title': 'Malaria Resistance', 'rs_id': 'rs8177374', 'dnaPair': 'CT', 'outcome': 'Normal resistance to Malaria'},
    {'title': 'Malaria Resistance', 'rs_id': 'rs8177374', 'dnaPair': 'TT', 'outcome': 'Increased resistance to Malaria and Tuberculosis'},

    {'title': 'Alcohol Cravings', 'rs_id':'rs1799971', 'dnaPair':'AA', 'outcome':'Normal cravings for alcoholic beverages'},
    {'title': 'Alcohol Cravings', 'rs_id':'rs1799971', 'dnaPair':'AG', 'outcome':'Stronger cravings for alcoholic beverages'},
    {'title': 'Alcohol Cravings', 'rs_id':'rs1799971', 'dnaPair':'GG', 'outcome':'Heightened cravings for alcohol consumption'},

    {'title': 'Cannabis Affinity', 'rs_id':'rs806380', 'dnaPair':'AA', 'outcome':'High affinity for cannabis'},
    {'title': 'Cannabis Affinity', 'rs_id':'rs806380', 'dnaPair':'AG', 'outcome':'Slightly lower affinity for cannabis'},
    {'title': 'Cannabis Affinity', 'rs_id':'rs806380', 'dnaPair':'GG', 'outcome':'Potentially lower affinity for cannabis'},

    {'title': 'Novelty Seeking', 'rs_id':'rs1800955', 'dnaPair':'CC', 'outcome':'Increased susceptibility for your tendency to seek novelty'},
    {'title': 'Novelty Seeking', 'rs_id':'rs1800955', 'dnaPair':'CT', 'outcome':'Increased susceptibility for your tendency to seek novelty'},
    {'title': 'Novelty Seeking', 'rs_id':'rs1800955', 'dnaPair':'TT', 'outcome':'Normal susceptibility for your tendency to seek novelty'},

    {'title': 'Empathetic Personality', 'rs_id': 'rs53576', 'dnaPair': 'AA', 'outcome': 'High chances of lacking empathy'},
    {'title': 'Empathetic Personality', 'rs_id': 'rs53576', 'dnaPair': 'AG', 'outcome': 'High chances of lacking empathy'},
    {'title': 'Empathetic Personality', 'rs_id': 'rs53576', 'dnaPair': 'GG', 'outcome': 'Likely to be optimistic and empathetic'},

    {'title': 'Muscle performance', 'rs_id': 'rs1815739', 'dnaPair': 'CC', 'outcome': 'Increased muscle performance'},
    {'title': 'Muscle performance', 'rs_id': 'rs1815739', 'dnaPair': 'CT', 'outcome': 'Increased likelihood of having better muscle performance'},
    {'title': 'Muscle performance', 'rs_id': 'rs1815739', 'dnaPair': 'TT', 'outcome': 'Lacking in muscle performance, may benefit endurance athletes'},

    {'title': 'Risk of hair loss', 'rs_id': 'rs6152', 'dnaPair': 'AA', 'outcome': 'Low likelihood of going bald'},
    {'title': 'Risk of hair loss', 'rs_id': 'rs6152', 'dnaPair': 'AG', 'outcome': 'Increased risk of baldness'},
    {'title': 'Risk of hair loss', 'rs_id': 'rs6152', 'dnaPair': 'GG', 'outcome': 'Heightened risk of baldness'},

    {'title': 'ADHD and Error avoidance', 'rs_id': 'rs1800497', 'dnaPair': 'CC', 'outcome': 'Better avoidance of errors, normal risk for OCD, unlikely to have ADHD'},
    {'title': 'ADHD and Error avoidance', 'rs_id': 'rs1800497', 'dnaPair': 'CT', 'outcome': 'Bad at avoidance of errors, low risk for OCD, likely to have ADHD'},
    {'title': 'ADHD and Error avoidance', 'rs_id': 'rs1800497', 'dnaPair': 'TT', 'outcome': 'Minimal pleasure response, increased pleasure seeking and/or addictive behavior, very likely to have ADHD'},

    {'title': 'Diabetes and/or Obesity', 'rs_id': 'rs9939609', 'dnaPair': 'AA', 'outcome': 'Increased likelihood of diabetes, as well as obesity'},
    {'title': 'Diabetes and/or Obesity', 'rs_id': 'rs9939609', 'dnaPair': 'AT', 'outcome': 'Normal risk for diabetes, but may potentially be at risk for obesity'},
    {'title': 'Diabetes and/or Obesity', 'rs_id': 'rs9939609', 'dnaPair': 'TT', 'outcome': 'Minimal risk of diabetes and obesity'},

    {'title': 'Risk for early Heart Attack', 'rs_id': 'rs662799', 'dnaPair': 'AA', 'outcome': 'Normal risk of weight gain and early heart attack'},
    {'title': 'Risk for early Heart Attack', 'rs_id': 'rs662799', 'dnaPair': 'AG', 'outcome': 'Increased risk of early heart attack, but can be avoided with proper dieting'},
    {'title': 'Risk for early Heart Attack', 'rs_id': 'rs662799', 'dnaPair': 'GG', 'outcome': 'High likelihood of weight gain / early heart disease and/or early heart attack'},

    {'title': 'Earwax and body odor', 'rs_id': 'rs17822931', 'dnaPair': 'CC', 'outcome': 'Wet earwax and should have normal body odor'},
    {'title': 'Earwax and body odor', 'rs_id': 'rs17822931', 'dnaPair': 'CT', 'outcome': 'Wet earwax but with better smelling body odor'},
    {'title': 'Earwax and body odor', 'rs_id': 'rs17822931', 'dnaPair': 'TT', 'outcome': 'Dry earwax, but no body odor'},

    {'title': 'Dopamine and stress', 'rs_id': 'rs4680', 'dnaPair': 'AA', 'outcome': 'More explatory behavior, increased dopamine levels but susceptible to stress'},
    {'title': 'Dopamine and stress', 'rs_id': 'rs4680', 'dnaPair': 'AG', 'outcome': 'Normal explatory behavior, regular dopamine levels and stress response'},
    {'title': 'Dopamine and stress', 'rs_id': 'rs4680', 'dnaPair': 'GG', 'outcome': 'Less explatory behavior, lower dopamine levels, increased response to stress'},

    {'title': 'Lactose Intolerance', 'rs_id': 'rs4988235', 'dnaPair': 'CC', 'outcome': 'High likelihood of being lactose intolerant'},
    {'title': 'Lactose Intolerance', 'rs_id': 'rs4988235', 'dnaPair': 'CT', 'outcome': 'May potentially be able to consume milk/lactose'},
    {'title': 'Lactose Intolerance', 'rs_id': 'rs4988235', 'dnaPair': 'TT', 'outcome': 'Can definitely consume milk/lactose without gastrointestinal distress'},

    {'title': 'Thrombosis (Blood clotting)', 'rs_id': 'rs6025', 'dnaPair': 'AA', 'outcome': '9x increased risk for thrombosis'},
    {'title': 'Thrombosis (Blood clotting)', 'rs_id': 'rs6025', 'dnaPair': 'AG', 'outcome': 'Increased likelihood for thrombosis'},
    {'title': 'Thrombosis (Blood clotting)', 'rs_id': 'rs6025', 'dnaPair': 'GG', 'outcome': 'Normal risk for thrombosis'},

    {'title': 'Rheumatoid Arthritis/ Lupus/ (T-1) Diabetes', 'rs_id': 'rs7574865', 'dnaPair': 'GG', 'outcome': 'Normal risk for Rheumatoid Arthritis (RA), lupus, and/or Type-1 Diabetes'},
    {'title': 'Rheumatoid Arthritis/ Lupus/ (T-1) Diabetes', 'rs_id': 'rs7574865', 'dnaPair': 'GT', 'outcome': '1.3x increased risk for Rheumatoid Arthritis (RA), lupus, and/or Type-1 Diabetes'},
    {'title': 'Rheumatoid Arthritis/ Lupus/ (T-1) Diabetes', 'rs_id': 'rs7574865', 'dnaPair': 'TT', 'outcome': '2.6x increased risk for Rheumatoid Arthritis (RA), lupus, and/or Type-1 Diabetes'},

    {'title': 'Asthma', 'rs_id': 'rs1695', 'dnaPair': 'AA', 'outcome': 'Normal risk for asthma'},
    {'title': 'Asthma', 'rs_id': 'rs1695', 'dnaPair': 'AG', 'outcome': 'Normal risk for asthma'},
    {'title': 'Asthma', 'rs_id': 'rs1695', 'dnaPair': 'GG', 'outcome': 'High likelihood of having asthma related symptoms'},

    {'title': 'Cilantro', 'rs_id': 'rs72921001', 'dnaPair': 'AA', 'outcome': 'Least likely to dislike cilantro, should not taste like soap'},
    {'title': 'Cilantro', 'rs_id': 'rs72921001', 'dnaPair': 'AC', 'outcome': 'Less likely to dislike cilantro, may potentially taste like soap'},
    {'title': 'Cilantro', 'rs_id': 'rs72921001', 'dnaPair': 'CC', 'outcome': 'Increased likelihood of disliking cilantro'},

    {'title': 'Periodontitis (Gum inflammatory disease)', 'rs_id': 'rs1537415', 'dnaPair': 'CC', 'outcome': 'Normal likelihood of developing periodontitis'},
    {'title': 'Periodontitis (Gum inflammatory disease)', 'rs_id': 'rs1537415', 'dnaPair': 'CG', 'outcome': '1.6x increased risk of developing periodontitis'},
    {'title': 'Periodontitis (Gum inflammatory disease)', 'rs_id': 'rs1537415', 'dnaPair': 'GG', 'outcome': '2x increased risk of developing periodontitis'},

    {'title': 'Coffee Affinity', 'rs_id': 'rs2472297', 'dnaPair': 'CC', 'outcome': 'Normal affinity for drinking coffee'},
    {'title': 'Coffee Affinity', 'rs_id': 'rs2472297', 'dnaPair': 'CT', 'outcome': 'Increased affinity for drinking coffee'},
    {'title': 'Coffee Affinity', 'rs_id': 'rs2472297', 'dnaPair': 'TT', 'outcome': 'Increased affinity for drinking coffee'},

    {'title': 'Warrior Gene (Behavioral Aggression)', 'rs_id': 'rs909525', 'dnaPair': 'AA', 'outcome': 'No warrior gene is present'},
    {'title': 'Warrior Gene (Behavioral Aggression)', 'rs_id': 'rs909525', 'dnaPair': 'AG', 'outcome': 'Normal potential of having the warrior gene'},
    {'title': 'Warrior Gene (Behavioral Aggression)', 'rs_id': 'rs909525', 'dnaPair': 'GG', 'outcome': 'High likelihood of having the warrior gene'}
]
