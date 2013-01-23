describe('iD.Way', function() {
    if (iD.debug) {
        it("freezes nodes", function () {
            expect(Object.isFrozen(iD.Way().nodes)).to.be.true;
        });
    }

    it("returns a way", function () {
        expect(iD.Way()).to.be.an.instanceOf(iD.Way);
        expect(iD.Way().type).to.equal("way");
    });

    it("returns a created Entity if no ID is specified", function () {
        expect(iD.Way().created()).to.be.ok;
    });

    it("returns an unmodified Entity if ID is specified", function () {
        expect(iD.Way({id: 'w1234'}).created()).not.to.be.ok;
        expect(iD.Way({id: 'w1234'}).modified()).not.to.be.ok;
    });

    it("defaults nodes to an empty array", function () {
        expect(iD.Way().nodes).to.eql([]);
    });

    it("sets nodes as specified", function () {
        expect(iD.Way({nodes: ["n-1"]}).nodes).to.eql(["n-1"]);
    });

    it("defaults tags to an empty object", function () {
        expect(iD.Way().tags).to.eql({});
    });

    it("sets tags as specified", function () {
        expect(iD.Way({tags: {foo: 'bar'}}).tags).to.eql({foo: 'bar'});
    });

    describe("#first", function () {
        it("returns the first node", function () {
            expect(iD.Way({nodes: ['a', 'b', 'c']}).first()).to.equal('a');
        });
    });

    describe("#last", function () {
        it("returns the last node", function () {
            expect(iD.Way({nodes: ['a', 'b', 'c']}).last()).to.equal('c');
        });
    });

    describe("#contains", function () {
        it("returns true if the way contains the given node", function () {
            expect(iD.Way({nodes: ['a', 'b', 'c']}).contains('b')).to.be.true;
        });

        it("returns false if the way does not contain the given node", function () {
            expect(iD.Way({nodes: ['a', 'b', 'c']}).contains('d')).to.be.false;
        });
    });

    describe("#extent", function () {
        it("returns the minimal extent containing all member nodes", function () {
            var node1 = iD.Node({loc: [0, 0]}),
                node2 = iD.Node({loc: [5, 10]}),
                way   = iD.Way({nodes: [node1.id, node2.id]}),
                graph = iD.Graph([node1, node2, way]);
            expect(way.extent(graph)).to.eql([[0, 0], [5, 10]]);
        });
    });

    describe('#isClosed', function() {
        it('returns false when the way has no nodes', function() {
            expect(iD.Way().isClosed()).to.equal(false);
        });

        it('returns false when the way ends are not equal', function() {
            expect(iD.Way({nodes: ['n1', 'n2']}).isClosed()).to.equal(false);
        });

        it('returns true when the way ends are equal', function() {
            expect(iD.Way({nodes: ['n1', 'n2', 'n1']}).isClosed()).to.equal(true);
        });
    });

    describe('#isOneWay', function() {
        it('returns false when the way has no tags', function() {
            expect(iD.Way().isOneWay()).to.eql(false);
        });

        it('returns false when the way has tag oneway=no', function() {
            expect(iD.Way({tags: { oneway: 'no' }}).isOneWay()).to.equal(false);
        });

        it('returns true when the way has tag oneway=yes', function() {
            expect(iD.Way({tags: { oneway: 'yes' }}).isOneWay()).to.equal(true);
        });
    });

    describe('#isArea', function() {
        it('returns false when the way has no tags', function() {
            expect(iD.Way().isArea()).to.equal(false);
        });

        it('returns true if the way has tag area=yes', function() {
            expect(iD.Way({tags: { area: 'yes' }}).isArea()).to.equal(true);
        });

        it('returns true if the way is closed and has no tags', function() {
            expect(iD.Way({nodes: ['n1', 'n1']}).isArea()).to.equal(true);
        });

        it('returns false if the way is closed and has tag area=no', function() {
            expect(iD.Way({tags: { area: 'no' }, nodes: ['n1', 'n1']}).isArea()).to.equal(false);
        });

        it('returns false if the way is closed and has highway tag', function() {
            expect(iD.Way({tags: { highway: 'residential' }, nodes: ['n1', 'n1']}).isArea()).to.equal(false);
        });
    });

    describe("#geometry", function() {
        it("returns 'line' when the way is not an area", function () {
            expect(iD.Way().geometry()).to.equal('line');
        });

        it("returns 'area' when the way is an area", function () {
            expect(iD.Way({tags: { area: 'yes' }}).geometry()).to.equal('area');
        });
    });

    describe("#addNode", function () {
        it("adds a node to the end of a way", function () {
            var w = iD.Way();
            expect(w.addNode('a').nodes).to.eql(['a']);
        });

        it("adds a node to a way at index 0", function () {
            var w = iD.Way({nodes: ['a', 'b']});
            expect(w.addNode('c', 0).nodes).to.eql(['c', 'a', 'b']);
        });

        it("adds a node to a way at a positive index", function () {
            var w = iD.Way({nodes: ['a', 'b']});
            expect(w.addNode('c', 1).nodes).to.eql(['a', 'c', 'b']);
        });

        it("adds a node to a way at a negative index", function () {
            var w = iD.Way({nodes: ['a', 'b']});
            expect(w.addNode('c', -1).nodes).to.eql(['a', 'c', 'b']);
        });
    });

    describe("#updateNode", function () {
        it("updates the node id at the specified index", function () {
            var w = iD.Way({nodes: ['a', 'b', 'c']});
            expect(w.updateNode('d', 1).nodes).to.eql(['a', 'd', 'c']);
        });
    });

    describe("#removeNode", function () {
        it("removes the node", function () {
            var a = iD.Node({id: 'a'}),
                w = iD.Way({nodes: ['a']});

            expect(w.removeNode('a').nodes).to.eql([]);
        });

        it("preserves circularity", function () {
            var a = iD.Node({id: 'a'}),
                b = iD.Node({id: 'b'}),
                c = iD.Node({id: 'c'}),
                d = iD.Node({id: 'd'}),
                w = iD.Way({nodes: ['a', 'b', 'c', 'd', 'a']});

            expect(w.removeNode('a').nodes).to.eql(['b', 'c', 'd', 'b']);
        });
    });
});
