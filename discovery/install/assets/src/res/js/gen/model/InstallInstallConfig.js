/**
 * Pydio Cells Rest API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 4.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
import InstallCheckResult from './InstallCheckResult';
import InstallProxyConfig from './InstallProxyConfig';

/**
 * The InstallInstallConfig model module.
 * @module model/InstallInstallConfig
 * @version 4.0
 */
class InstallInstallConfig {
    /**
     * Constructs a new <code>InstallInstallConfig</code>.
     * @alias module:model/InstallInstallConfig
     */
    constructor() { 
        
        InstallInstallConfig.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>InstallInstallConfig</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/InstallInstallConfig} obj Optional instance to populate.
     * @return {module:model/InstallInstallConfig} The populated <code>InstallInstallConfig</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new InstallInstallConfig();

            if (data.hasOwnProperty('CheckResults')) {
                obj['CheckResults'] = ApiClient.convertToType(data['CheckResults'], [InstallCheckResult]);
            }
            if (data.hasOwnProperty('DocumentsDSN')) {
                obj['DocumentsDSN'] = ApiClient.convertToType(data['DocumentsDSN'], 'String');
            }
            if (data.hasOwnProperty('ProxyConfig')) {
                obj['ProxyConfig'] = InstallProxyConfig.constructFromObject(data['ProxyConfig']);
            }
            if (data.hasOwnProperty('UseDocumentsDSN')) {
                obj['UseDocumentsDSN'] = ApiClient.convertToType(data['UseDocumentsDSN'], 'Boolean');
            }
            if (data.hasOwnProperty('dbConnectionType')) {
                obj['dbConnectionType'] = ApiClient.convertToType(data['dbConnectionType'], 'String');
            }
            if (data.hasOwnProperty('dbManualDSN')) {
                obj['dbManualDSN'] = ApiClient.convertToType(data['dbManualDSN'], 'String');
            }
            if (data.hasOwnProperty('dbSocketFile')) {
                obj['dbSocketFile'] = ApiClient.convertToType(data['dbSocketFile'], 'String');
            }
            if (data.hasOwnProperty('dbSocketName')) {
                obj['dbSocketName'] = ApiClient.convertToType(data['dbSocketName'], 'String');
            }
            if (data.hasOwnProperty('dbSocketPassword')) {
                obj['dbSocketPassword'] = ApiClient.convertToType(data['dbSocketPassword'], 'String');
            }
            if (data.hasOwnProperty('dbSocketUser')) {
                obj['dbSocketUser'] = ApiClient.convertToType(data['dbSocketUser'], 'String');
            }
            if (data.hasOwnProperty('dbTCPHostname')) {
                obj['dbTCPHostname'] = ApiClient.convertToType(data['dbTCPHostname'], 'String');
            }
            if (data.hasOwnProperty('dbTCPName')) {
                obj['dbTCPName'] = ApiClient.convertToType(data['dbTCPName'], 'String');
            }
            if (data.hasOwnProperty('dbTCPPassword')) {
                obj['dbTCPPassword'] = ApiClient.convertToType(data['dbTCPPassword'], 'String');
            }
            if (data.hasOwnProperty('dbTCPPort')) {
                obj['dbTCPPort'] = ApiClient.convertToType(data['dbTCPPort'], 'String');
            }
            if (data.hasOwnProperty('dbTCPUser')) {
                obj['dbTCPUser'] = ApiClient.convertToType(data['dbTCPUser'], 'String');
            }
            if (data.hasOwnProperty('dbUseDefaults')) {
                obj['dbUseDefaults'] = ApiClient.convertToType(data['dbUseDefaults'], 'Boolean');
            }
            if (data.hasOwnProperty('dsFolder')) {
                obj['dsFolder'] = ApiClient.convertToType(data['dsFolder'], 'String');
            }
            if (data.hasOwnProperty('dsName')) {
                obj['dsName'] = ApiClient.convertToType(data['dsName'], 'String');
            }
            if (data.hasOwnProperty('dsPort')) {
                obj['dsPort'] = ApiClient.convertToType(data['dsPort'], 'String');
            }
            if (data.hasOwnProperty('dsS3ApiKey')) {
                obj['dsS3ApiKey'] = ApiClient.convertToType(data['dsS3ApiKey'], 'String');
            }
            if (data.hasOwnProperty('dsS3ApiSecret')) {
                obj['dsS3ApiSecret'] = ApiClient.convertToType(data['dsS3ApiSecret'], 'String');
            }
            if (data.hasOwnProperty('dsS3BucketBinaries')) {
                obj['dsS3BucketBinaries'] = ApiClient.convertToType(data['dsS3BucketBinaries'], 'String');
            }
            if (data.hasOwnProperty('dsS3BucketCells')) {
                obj['dsS3BucketCells'] = ApiClient.convertToType(data['dsS3BucketCells'], 'String');
            }
            if (data.hasOwnProperty('dsS3BucketDefault')) {
                obj['dsS3BucketDefault'] = ApiClient.convertToType(data['dsS3BucketDefault'], 'String');
            }
            if (data.hasOwnProperty('dsS3BucketPersonal')) {
                obj['dsS3BucketPersonal'] = ApiClient.convertToType(data['dsS3BucketPersonal'], 'String');
            }
            if (data.hasOwnProperty('dsS3BucketThumbs')) {
                obj['dsS3BucketThumbs'] = ApiClient.convertToType(data['dsS3BucketThumbs'], 'String');
            }
            if (data.hasOwnProperty('dsS3BucketVersions')) {
                obj['dsS3BucketVersions'] = ApiClient.convertToType(data['dsS3BucketVersions'], 'String');
            }
            if (data.hasOwnProperty('dsS3Custom')) {
                obj['dsS3Custom'] = ApiClient.convertToType(data['dsS3Custom'], 'String');
            }
            if (data.hasOwnProperty('dsS3CustomRegion')) {
                obj['dsS3CustomRegion'] = ApiClient.convertToType(data['dsS3CustomRegion'], 'String');
            }
            if (data.hasOwnProperty('dsType')) {
                obj['dsType'] = ApiClient.convertToType(data['dsType'], 'String');
            }
            if (data.hasOwnProperty('frontendApplicationTitle')) {
                obj['frontendApplicationTitle'] = ApiClient.convertToType(data['frontendApplicationTitle'], 'String');
            }
            if (data.hasOwnProperty('frontendDefaultLanguage')) {
                obj['frontendDefaultLanguage'] = ApiClient.convertToType(data['frontendDefaultLanguage'], 'String');
            }
            if (data.hasOwnProperty('frontendHosts')) {
                obj['frontendHosts'] = ApiClient.convertToType(data['frontendHosts'], 'String');
            }
            if (data.hasOwnProperty('frontendLogin')) {
                obj['frontendLogin'] = ApiClient.convertToType(data['frontendLogin'], 'String');
            }
            if (data.hasOwnProperty('frontendPassword')) {
                obj['frontendPassword'] = ApiClient.convertToType(data['frontendPassword'], 'String');
            }
            if (data.hasOwnProperty('frontendRepeatPassword')) {
                obj['frontendRepeatPassword'] = ApiClient.convertToType(data['frontendRepeatPassword'], 'String');
            }
            if (data.hasOwnProperty('internalUrl')) {
                obj['internalUrl'] = ApiClient.convertToType(data['internalUrl'], 'String');
            }
            if (data.hasOwnProperty('licenseRequired')) {
                obj['licenseRequired'] = ApiClient.convertToType(data['licenseRequired'], 'Boolean');
            }
            if (data.hasOwnProperty('licenseString')) {
                obj['licenseString'] = ApiClient.convertToType(data['licenseString'], 'String');
            }
        }
        return obj;
    }


}

/**
 * @member {Array.<module:model/InstallCheckResult>} CheckResults
 */
InstallInstallConfig.prototype['CheckResults'] = undefined;

/**
 * @member {String} DocumentsDSN
 */
InstallInstallConfig.prototype['DocumentsDSN'] = undefined;

/**
 * @member {module:model/InstallProxyConfig} ProxyConfig
 */
InstallInstallConfig.prototype['ProxyConfig'] = undefined;

/**
 * @member {Boolean} UseDocumentsDSN
 */
InstallInstallConfig.prototype['UseDocumentsDSN'] = undefined;

/**
 * @member {String} dbConnectionType
 */
InstallInstallConfig.prototype['dbConnectionType'] = undefined;

/**
 * @member {String} dbManualDSN
 */
InstallInstallConfig.prototype['dbManualDSN'] = undefined;

/**
 * @member {String} dbSocketFile
 */
InstallInstallConfig.prototype['dbSocketFile'] = undefined;

/**
 * @member {String} dbSocketName
 */
InstallInstallConfig.prototype['dbSocketName'] = undefined;

/**
 * @member {String} dbSocketPassword
 */
InstallInstallConfig.prototype['dbSocketPassword'] = undefined;

/**
 * @member {String} dbSocketUser
 */
InstallInstallConfig.prototype['dbSocketUser'] = undefined;

/**
 * @member {String} dbTCPHostname
 */
InstallInstallConfig.prototype['dbTCPHostname'] = undefined;

/**
 * @member {String} dbTCPName
 */
InstallInstallConfig.prototype['dbTCPName'] = undefined;

/**
 * @member {String} dbTCPPassword
 */
InstallInstallConfig.prototype['dbTCPPassword'] = undefined;

/**
 * @member {String} dbTCPPort
 */
InstallInstallConfig.prototype['dbTCPPort'] = undefined;

/**
 * @member {String} dbTCPUser
 */
InstallInstallConfig.prototype['dbTCPUser'] = undefined;

/**
 * @member {Boolean} dbUseDefaults
 */
InstallInstallConfig.prototype['dbUseDefaults'] = undefined;

/**
 * @member {String} dsFolder
 */
InstallInstallConfig.prototype['dsFolder'] = undefined;

/**
 * @member {String} dsName
 */
InstallInstallConfig.prototype['dsName'] = undefined;

/**
 * @member {String} dsPort
 */
InstallInstallConfig.prototype['dsPort'] = undefined;

/**
 * @member {String} dsS3ApiKey
 */
InstallInstallConfig.prototype['dsS3ApiKey'] = undefined;

/**
 * @member {String} dsS3ApiSecret
 */
InstallInstallConfig.prototype['dsS3ApiSecret'] = undefined;

/**
 * @member {String} dsS3BucketBinaries
 */
InstallInstallConfig.prototype['dsS3BucketBinaries'] = undefined;

/**
 * @member {String} dsS3BucketCells
 */
InstallInstallConfig.prototype['dsS3BucketCells'] = undefined;

/**
 * @member {String} dsS3BucketDefault
 */
InstallInstallConfig.prototype['dsS3BucketDefault'] = undefined;

/**
 * @member {String} dsS3BucketPersonal
 */
InstallInstallConfig.prototype['dsS3BucketPersonal'] = undefined;

/**
 * @member {String} dsS3BucketThumbs
 */
InstallInstallConfig.prototype['dsS3BucketThumbs'] = undefined;

/**
 * @member {String} dsS3BucketVersions
 */
InstallInstallConfig.prototype['dsS3BucketVersions'] = undefined;

/**
 * @member {String} dsS3Custom
 */
InstallInstallConfig.prototype['dsS3Custom'] = undefined;

/**
 * @member {String} dsS3CustomRegion
 */
InstallInstallConfig.prototype['dsS3CustomRegion'] = undefined;

/**
 * @member {String} dsType
 */
InstallInstallConfig.prototype['dsType'] = undefined;

/**
 * @member {String} frontendApplicationTitle
 */
InstallInstallConfig.prototype['frontendApplicationTitle'] = undefined;

/**
 * @member {String} frontendDefaultLanguage
 */
InstallInstallConfig.prototype['frontendDefaultLanguage'] = undefined;

/**
 * @member {String} frontendHosts
 */
InstallInstallConfig.prototype['frontendHosts'] = undefined;

/**
 * @member {String} frontendLogin
 */
InstallInstallConfig.prototype['frontendLogin'] = undefined;

/**
 * @member {String} frontendPassword
 */
InstallInstallConfig.prototype['frontendPassword'] = undefined;

/**
 * @member {String} frontendRepeatPassword
 */
InstallInstallConfig.prototype['frontendRepeatPassword'] = undefined;

/**
 * @member {String} internalUrl
 */
InstallInstallConfig.prototype['internalUrl'] = undefined;

/**
 * @member {Boolean} licenseRequired
 */
InstallInstallConfig.prototype['licenseRequired'] = undefined;

/**
 * @member {String} licenseString
 */
InstallInstallConfig.prototype['licenseString'] = undefined;






export default InstallInstallConfig;

