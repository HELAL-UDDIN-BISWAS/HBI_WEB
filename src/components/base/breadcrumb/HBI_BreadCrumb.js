import React from 'react';
import { FaChevronRight } from 'react-icons/fa';
import Link from 'next/link';
import './HBI_BreadCrumb.css';

const HBI_BreadCrumb = ({ items = null, pageName = '' }) => {
	return (
		<>
			{pageName && <div id='Add Clinic Admin' className="pageName">{pageName}</div>}
			{items?.length > 0 && (
				<div className="breadcrumb">
					{items.map((item, index) => (
						<div
							key={index}
							style={{ display: 'flex', alignItems: 'center' }}>
							{index !== 0 && <FaChevronRight className="breadcrumb-icon" />}
							{item.href ? (
								<Link
									className="breadcrumb-link"
									href={`/${item.href}`}>
									{item.label}
								</Link>
							) : (
								<span className="breadcrumb-label">{item.label}</span>
							)}
						</div>
					))}
				</div>
			)}
		</>
	);
};

export default HBI_BreadCrumb;
