const Bar = (props: any) => {
    const {alts: [up, top, str], index, width, selectIndex} = props;
    console.log(up, top, width);
    const x = index * width + 1;
    const y = 100 - top * 100 + 1;
    const barWidth = width - 5;
    const barHeight = 100 * (top - up) - 2;
    const selectStyle = {fillOpacity: selectIndex === index ? 0.3 : 0}
    console.log(selectStyle);
    return (
        <g>
            {/*<text x={x+ barWidth/2+'%'} y={y + barHeight/2 + '%'}*/}
            {/*      fontSize={12}*/}
            {/*      alignmentBaseline="middle"*/}
            {/*      textAnchor="middle"*/}
            {/*      writingMode="ub"*/}
            {/*>*/}
            {/*    {str}*/}
            {/*</text>*/}
            <rect
                x={x + '%'}
                y={y + '%'}
                width={barWidth + '%'}
                height={barHeight + '%'}
                className="bar"
                onClick={() => props.onSelect(index)}
                style={selectStyle}
            >
                <title>{str}</title>
            </rect>
        </g>
    )
}


const View = (props: any) => {
    const {polygons} = props.store.model ;
    console.log(polygons);
    const max = polygons.reduce((res: number, polygon: any) => {
        const [, top] = polygon.alts;
        return top.value > res ? top.value : res;
    }, 0);

    const normalAlts = polygons.map((p: any): [number, number, string] => {
        const [up, top, str] = p.alts;
        return [up.value / max, top.value / max, str];
    })

    return (
        <div id="draw-alts" className="draw-alts">
            <svg width="100%" height="100%">
                {normalAlts.map((alts: any, index: number) => <Bar
                    key={index}
                    selectIndex={props.selectIndex}
                    onSelect={props.onSelect}
                    width={100 / normalAlts.length}
                    alts={alts}
                    index={index}
                />)}
            </svg>
        </div>
    )

}

export default View;