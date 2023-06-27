const HierarchyItemType = {
	/**
	 * point to the thing object,the tree base node
	 */
	Object: 'Object',

	/**
	 * point to the thing body,the child of the object
	 */
	Body: 'Body',

	/**
	 * point to the render node of the thing body,the child of the body
	 */
	BodyNode: 'BodyNode',

	/**
	 * point to the children of the thing object.
	 */
	Children: 'Children',

};
export{HierarchyItemType}